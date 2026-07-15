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
    // Command reviews currently omit elapsed time; other exported entries include it.
    if (entry.el !== undefined && (!isFiniteNumber(entry.el) || entry.el < 0)) {
      errors.push(`${at}.el must be a non-negative number when present`);
    }
    if (!isFiniteNumber(entry.S) || entry.S < 0) {
      errors.push(`${at}.S must be a non-negative number`);
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
  const correct = entries => entries.filter(entry => entry.g === 3).length;

  console.log('FSRS REVIEW REPORT');
  console.log('==================');
  console.log(`Total reviews: ${log.length}`);
  console.log(`Overall accuracy: ${percent(correct(log), log.length)}`);
  const recent = log.slice(-100);
  console.log(`Last 100 accuracy: ${percent(correct(recent), recent.length)} (${recent.length} reviews)`);

  console.log('\nBy kind');
  console.log('-------');
  for (const kind of KINDS) {
    const entries = log.filter(entry => entry.k === kind);
    console.log(`${kind.padEnd(3)}  ${String(entries.length).padStart(5)} reviews  ${percent(correct(entries), entries.length).padStart(6)} accuracy`);
  }

  const daily = new Map();
  for (const entry of log) {
    const day = localDay(entry.t);
    daily.set(day, (daily.get(day) || 0) + 1);
  }
  console.log('\nReviews per day');
  console.log('---------------');
  if (daily.size === 0) console.log('No reviews recorded.');
  else for (const [day, count] of daily) console.log(`${day}  ${count}`);
  const streak = currentStreak(log);
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
  console.log(`Current data: ${log.length} reviews${log.length >= 300 ? ' (threshold reached)' : ` (${300 - log.length} more needed)`}.`);
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

main();
