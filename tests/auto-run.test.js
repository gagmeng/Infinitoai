const test = require('node:test');
const assert = require('node:assert/strict');

const {
  shouldContinueAutoRunAfterError,
  summarizeAutoRunResult,
} = require('../shared/auto-run.js');

test('auto run continues to next round after a normal run failure', () => {
  assert.equal(
    shouldContinueAutoRunAfterError(new Error('Step 4 failed')),
    true
  );
});

test('auto run stops on stop and manual-handoff sentinel errors', () => {
  assert.equal(
    shouldContinueAutoRunAfterError(new Error('Flow stopped by user.')),
    false
  );
  assert.equal(
    shouldContinueAutoRunAfterError(new Error('Auto run handed off to manual continuation.')),
    false
  );
});

test('auto run summary reports mixed success and failure correctly', () => {
  assert.deepEqual(
    summarizeAutoRunResult({
      totalRuns: 5,
      successfulRuns: 3,
      failedRuns: 2,
      lastAttemptedRun: 5,
      stopRequested: false,
      handedOffToManual: false,
    }),
    {
      phase: 'complete',
      message: '=== Auto run finished: 3 succeeded, 2 failed, 5 total ===',
    }
  );
});
