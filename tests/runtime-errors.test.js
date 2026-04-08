const test = require('node:test');
const assert = require('node:assert/strict');

const { isMessageChannelClosedError } = require('../shared/runtime-errors.js');

test('detects closed message-channel errors from async listeners', () => {
  assert.equal(
    isMessageChannelClosedError('A listener indicated an asynchronous response by returning true, but the message channel closed before a response was received'),
    true
  );
});

test('ignores unrelated runtime errors', () => {
  assert.equal(isMessageChannelClosedError('No matching verification email found after 60s'), false);
});
