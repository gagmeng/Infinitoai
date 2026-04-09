const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

function loadUtilsContext() {
  const sentMessages = [];
  const listeners = [];
  const context = {
    console: {
      log() {},
      warn() {},
      error() {},
    },
    location: { href: 'https://auth.openai.com/create-account' },
    document: {
      body: { innerText: '' },
      documentElement: {},
      querySelector() { return null; },
      querySelectorAll() { return []; },
    },
    chrome: {
      runtime: {
        onMessage: {
          addListener(listener) {
            listeners.push(listener);
          },
        },
        sendMessage(message) {
          sentMessages.push(message);
        },
      },
    },
    MutationObserver: class {
      disconnect() {}
      observe() {}
    },
    Event: class {
      constructor(type, init = {}) {
        this.type = type;
        Object.assign(this, init);
      }
    },
    MouseEvent: class {
      constructor(type, init = {}) {
        this.type = type;
        Object.assign(this, init);
      }
    },
    KeyboardEvent: class {
      constructor(type, init = {}) {
        this.type = type;
        Object.assign(this, init);
      }
    },
    InputEvent: class {
      constructor(type, init = {}) {
        this.type = type;
        Object.assign(this, init);
      }
    },
    Date,
    setTimeout,
    clearTimeout,
  };

  context.window = context;
  context.top = context;
  context.__listeners = listeners;
  context.__sentMessages = sentMessages;

  const scriptPath = path.join(__dirname, '..', 'content', 'utils.js');
  const code = fs.readFileSync(scriptPath, 'utf8');
  vm.createContext(context);
  vm.runInContext(code, context, { filename: scriptPath });

  return context;
}

test('reportError emits step error without a duplicate LOG message', () => {
  const context = loadUtilsContext();
  context.__sentMessages.length = 0;

  context.reportError(7, 'Phone verification required');

  assert.deepEqual(
    context.__sentMessages.map((message) => message.type),
    ['STEP_ERROR']
  );
});
