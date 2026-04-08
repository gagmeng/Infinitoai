const test = require('node:test');
const assert = require('node:assert/strict');

const { getQqRefreshFolderSequence } = require('../shared/qq-refresh.js');

test('qq refresh sequence visits important contacts before inbox', () => {
  assert.deepEqual(getQqRefreshFolderSequence(), ['重要联系人', '收件箱']);
});
