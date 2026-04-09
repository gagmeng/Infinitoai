(function(root, factory) {
  const exports = factory();

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = exports;
  }

  root.RuntimeErrors = exports;
})(typeof globalThis !== 'undefined' ? globalThis : self, function() {
  function isMessageChannelClosedError(error) {
    const message = typeof error === 'string' ? error : error?.message || '';
    return /message channel closed before a response was received/i.test(message);
  }

  function isReceivingEndMissingError(error) {
    const message = typeof error === 'string' ? error : error?.message || '';
    return /could not establish connection\.\s*receiving end does not exist/i.test(message);
  }

  function shouldSkipStepResultLog(status) {
    return status === 'failed' || status === 'stopped';
  }

  return {
    isMessageChannelClosedError,
    isReceivingEndMissingError,
    shouldSkipStepResultLog,
  };
});
