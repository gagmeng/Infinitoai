const test = require('node:test');
const assert = require('node:assert/strict');

const { shouldDisableStepButton, shouldEnableStopButton } = require('../shared/manual-step-controls.js');

test('step buttons stay enabled when no step is running', () => {
  assert.equal(shouldDisableStepButton({ anyRunning: false }), false);
});

test('step buttons are disabled while a step is actively running', () => {
  assert.equal(shouldDisableStepButton({ anyRunning: true }), true);
});

test('stop button stays enabled after a failed manual continuation', () => {
  assert.equal(
    shouldEnableStopButton({
      anyRunning: false,
      autoContinueVisible: false,
      statuses: { 7: 'failed' },
    }),
    true
  );
});

test('stop button stays enabled while waiting for manual email continuation', () => {
  assert.equal(
    shouldEnableStopButton({
      anyRunning: false,
      autoContinueVisible: true,
      statuses: {},
    }),
    true
  );
});

test('stop button stays enabled while auto-run is active between steps', () => {
  assert.equal(
    shouldEnableStopButton({
      anyRunning: false,
      autoContinueVisible: false,
      autoRunPhase: 'running',
      statuses: { 1: 'completed', 2: 'completed' },
    }),
    true
  );
});

test('stop button is disabled when the flow is fully idle', () => {
  assert.equal(
    shouldEnableStopButton({
      anyRunning: false,
      autoContinueVisible: false,
      autoRunPhase: 'idle',
      statuses: { 1: 'completed', 2: 'completed' },
    }),
    false
  );
});
