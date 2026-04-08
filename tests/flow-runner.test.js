const test = require('node:test');
const assert = require('node:assert/strict');

const {
  buildStepSequence,
  getStepDelayAfter,
  runStepSequence,
} = require('../shared/flow-runner.js');

test('buildStepSequence returns every remaining step from the manual starting point', () => {
  assert.deepEqual(buildStepSequence(3), [3, 4, 5, 6, 7, 8, 9]);
});

test('getStepDelayAfter preserves the longer waits for transition-heavy steps', () => {
  assert.equal(getStepDelayAfter(3), 3000);
  assert.equal(getStepDelayAfter(4), 2000);
  assert.equal(getStepDelayAfter(9), 1000);
});

test('runStepSequence executes the current step and all later steps in order', async () => {
  const calls = [];

  await runStepSequence({
    startStep: 3,
    executeStepAndWait: async (step, delayAfter) => {
      calls.push({ step, delayAfter });
    },
  });

  assert.deepEqual(calls, [
    { step: 3, delayAfter: 3000 },
    { step: 4, delayAfter: 2000 },
    { step: 5, delayAfter: 3000 },
    { step: 6, delayAfter: 3000 },
    { step: 7, delayAfter: 2000 },
    { step: 8, delayAfter: 2000 },
    { step: 9, delayAfter: 1000 },
  ]);
});

test('runStepSequence stops immediately when a later step fails', async () => {
  const calls = [];

  await assert.rejects(
    runStepSequence({
      startStep: 6,
      executeStepAndWait: async (step) => {
        calls.push(step);
        if (step === 7) {
          throw new Error('step 7 failed');
        }
      },
    }),
    /step 7 failed/
  );

  assert.deepEqual(calls, [6, 7]);
});
