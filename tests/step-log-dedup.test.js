const test = require('node:test');
const assert = require('node:assert/strict');

const { shouldSkipStepResultLog } = require('../shared/runtime-errors.js');

test('shouldSkipStepResultLog skips duplicate logs for already terminal steps', () => {
  assert.equal(shouldSkipStepResultLog('failed'), true);
  assert.equal(shouldSkipStepResultLog('stopped'), true);
});

test('shouldSkipStepResultLog keeps logging for active steps', () => {
  assert.equal(shouldSkipStepResultLog('running'), false);
  assert.equal(shouldSkipStepResultLog('pending'), false);
  assert.equal(shouldSkipStepResultLog(undefined), false);
});
