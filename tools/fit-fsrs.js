#!/usr/bin/env node
'use strict';

const fs = require('fs');

const KINDS = ['obj', 'phr', 'cmd'];
const GRADE_LABELS = { 1: 'Again', 2: 'Hard', 3: 'Good', 4: 'Easy' };

function fail(message) {
  console.error(`Error: ${message}`);
  process.exitCode = 1;
}

function isFiniteNumber(value) {
  return typeof value === 'number' && Number.isFinite(value);
}

function validateSave(save) {
  const errors = [];
  if (!save || typeof save !== 'object' || Array.isArray(save)) {
    return ['the file must contain a top-level JSON object'];
  }
  if (!Array.isArray(save.log)) errors.push('top-level "log" must be an array');
  if (!Array.isArray(save.deck)) errors.push('top-level "deck" must be an array');
  if (errors.length) return errors;

  save.log.forEach((entry, index) => {
    const at = `log[${index}]`;
    if (!entry || typeof entry !== 'object' || Array.isArray(entry)) {
      errors.push(`${at} must be an object`);
      return;
    }
    if (!isFiniteNumber(entry.t) || Number.isNaN(new Date(entry.t).getTime())) {
      errors.push(`${at}.t must be a valid millisecond timestamp`);
    }
    if (typeof entry.id !== 'string' || entry.id.length === 0) {
      errors.push(`${at}.id must be a non-empty string`);
    }
    if (!KINDS.includes(entry.k)) errors.push(`${at}.k must be obj, phr, or cmd`);
    if (![1, 2, 3, 4].includes(entry.g)) errors.push(`${at}.g must be a grade from 1 to 4`);
    // Ordinary reviews use elapsed days; instrumented command attempts use milliseconds.
    if (entry.el !== undefined && (!isFiniteNumber(entry.el) || entry.el < 0)) {
      errors.push(`${at}.el must be a non-negative number when present`);
    }
    if (!isFiniteNumber(entry.S) || entry.S < 0) {
      errors.push(`${at}.S must be a non-negative number`);
    }
    if (entry.k === 'cmd' && entry.scheduled !== undefined) {
      if (!['driving', 'precheck'].includes(entry.phase)) errors.push(`${at}.phase must be driving or precheck`);
      if (!['due', 'practice'].includes(entry.mode)) errors.push(`${at}.mode must be due or practice`);
      for (const field of ['timed', 'first', 'scheduled', 'timeout']) {
        if (typeof entry[field] !== 'boolean') errors.push(`${at}.${field} must be boolean`);
      }
      if (entry.hinted !== undefined && typeof entry.hinted !== 'boolean') {
        errors.push(`${at}.hinted must be boolean when present`);
      }
      if (entry.selected !== null && (typeof entry.selected !== 'string' || !entry.selected)) {
        errors.push(`${at}.selected must be null or a non-empty string`);
      }
      if (!isFiniteNumber(entry.ms) || entry.ms < 0) errors.push(`${at}.ms must be a non-negative number`);
      if (!Number.isInteger(entry.replays) || entry.replays < 0) errors.push(`${at}.replays must be a non-negative integer`);
      if (typeof entry.surface !== 'string' || !entry.surface) errors.push(`${at}.surface must be a non-empty string`);
    }
  });

  save.deck.forEach((card, index) => {
    const at = `deck[${index}]`;
    if (!card || typeof card !== 'object' || Array.isArray(card)) {
      errors.push(`${at} must be an object`);
      return;
    }
    if (card.S !== undefined && (!isFiniteNumber(card.S) || card.S < 0)) {
      errors.push(`${at}.S must be a non-negative number when present`);
    }
  });

  return errors;
}

function percent(correct, total) {
  return total ? `${(100 * correct / total).toFixed(1)}%` : '—';
}

function localDay(timestamp) {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function currentStreak(log, now = new Date()) {
  const reviewDays = new Set(log.map(entry => localDay(entry.t)));
  let cursor = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (!reviewDays.has(localDay(cursor.getTime()))) cursor.setDate(cursor.getDate() - 1);
  let streak = 0;
  while (reviewDays.has(localDay(cursor.getTime()))) {
    streak++;
    cursor.setDate(cursor.getDate() - 1);
  }
  return streak;
}

function report(save) {
  const log = save.log.slice().sort((a, b) => a.t - b.t);
  const authoritative = log.filter(entry => entry.scheduled !== false);
  const diagnostic = log.filter(entry => entry.scheduled === false);
  const correct = entries => entries.filter(entry => entry.g === 3).length;

  console.log('FSRS REVIEW REPORT');
  console.log('==================');
  console.log(`Total attempts: ${log.length}`);
  console.log(`Authoritative reviews: ${authoritative.length}`);
  console.log(`Diagnostic command attempts: ${diagnostic.length}`);
  console.log(`Overall authoritative accuracy: ${percent(correct(authoritative), authoritative.length)}`);
  const recent = authoritative.slice(-100);
  console.log(`Last 100 accuracy: ${percent(correct(recent), recent.length)} (${recent.length} reviews)`);

  console.log('\nBy kind');
  console.log('-------');
  for (const kind of KINDS) {
    const entries = authoritative.filter(entry => entry.k === kind);
    console.log(`${kind.padEnd(3)}  ${String(entries.length).padStart(5)} reviews  ${percent(correct(entries), entries.length).padStart(6)} accuracy`);
  }

  const daily = new Map();
  for (const entry of authoritative) {
    const day = localDay(entry.t);
    daily.set(day, (daily.get(day) || 0) + 1);
  }
  console.log('\nReviews per day');
  console.log('---------------');
  if (daily.size === 0) console.log('No reviews recorded.');
  else for (const [day, count] of daily) console.log(`${day}  ${count}`);
  const streak = currentStreak(authoritative);
  console.log(`Current streak: ${streak} day${streak === 1 ? '' : 's'}`);

  const stabilityBuckets = [
    ['<1d', stability => stability < 1],
    ['1–7d', stability => stability >= 1 && stability < 7],
    ['7–21d', stability => stability >= 7 && stability < 21],
    ['21+d', stability => stability >= 21],
  ];
  console.log('\nCurrent deck stability');
  console.log('----------------------');
  for (const [label, matches] of stabilityBuckets) {
    const count = save.deck.filter(card => matches(card.S || 0.01)).length;
    console.log(`${label.padEnd(6)} ${count}`);
  }

  console.log('\nMean elapsed time by grade (days)');
  console.log('---------------------------------');
  for (const grade of [1, 2, 3, 4]) {
    const elapsed = log.filter(entry => entry.g === grade && isFiniteNumber(entry.el)).map(entry => entry.el);
    const mean = elapsed.length ? (elapsed.reduce((sum, value) => sum + value, 0) / elapsed.length).toFixed(2) : '—';
    console.log(`${grade} ${GRADE_LABELS[grade].padEnd(5)}  ${mean}  (${elapsed.length} with elapsed time)`);
  }

  console.log('\nTODO — FSRS PARAMETER FITTING');
  console.log('-----------------------------');
  console.log('Not implemented: fit and print a replacement FW array once 300+ real reviews are available.');
  console.log(`Current data: ${authoritative.length} authoritative reviews${authoritative.length >= 300 ? ' (threshold reached)' : ` (${300 - authoritative.length} more needed)`}.`);
}

function main() {
  const inputPath = process.argv[2];
  if (!inputPath || process.argv.length !== 3) {
    fail('usage: node tools/fit-fsrs.js <exported-save.json>');
    return;
  }

  let save;
  try {
    save = JSON.parse(fs.readFileSync(inputPath, 'utf8'));
  } catch (error) {
    fail(`cannot read valid JSON from ${inputPath}: ${error.message}`);
    return;
  }

  const errors = validateSave(save);
  if (errors.length) {
    fail(`invalid exported save:\n- ${errors.join('\n- ')}`);
    return;
  }
  report(save);
}

if (require.main === module) main();

module.exports = { validateSave, report };
