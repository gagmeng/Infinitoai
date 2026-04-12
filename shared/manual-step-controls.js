(function(root, factory) {
  const exports = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }

  root.ManualStepControls = exports;
})(typeof globalThis !== 'undefined' ? globalThis : self, function() {
  function shouldDisableStepButton({ anyRunning }) {
    return Boolean(anyRunning);
  }

  function shouldEnableStopButton({ anyRunning = false, autoContinueVisible = false, autoRunPhase = '', statuses = {} } = {}) {
    const hasFailedStep = Object.values(statuses).some((status) => status === 'failed');
    const autoRunActive = ['running', 'waiting_rotation', 'waiting_email'].includes(String(autoRunPhase || '').trim().toLowerCase());
    return Boolean(anyRunning || autoContinueVisible || hasFailedStep || autoRunActive);
  }

  return {
    shouldDisableStepButton,
    shouldEnableStopButton,
  };
});
