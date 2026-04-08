const test = require('node:test');
const assert = require('node:assert/strict');

const { isPhoneVerificationRequiredText } = require('../shared/phone-verification.js');

test('detects Chinese phone verification prompts', () => {
  assert.equal(isPhoneVerificationRequiredText('验证手机号码后继续'), true);
  assert.equal(isPhoneVerificationRequiredText('请输入你的手机号'), true);
  assert.equal(isPhoneVerificationRequiredText('电话号码是必填项 请继续添加电话号码'), true);
});

test('detects English phone verification prompts', () => {
  assert.equal(isPhoneVerificationRequiredText('Verify your phone number to continue'), true);
  assert.equal(isPhoneVerificationRequiredText('Enter your phone number'), true);
});

test('does not flag unrelated OAuth consent text', () => {
  assert.equal(isPhoneVerificationRequiredText('使用 ChatGPT 登录到 Codex 继续'), false);
  assert.equal(isPhoneVerificationRequiredText('Your ChatGPT code is 281878'), false);
});
