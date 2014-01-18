(function() {
  /**
   * Celtic
   *  Gaeilge (Irish)
   */
  Smart.Plurals.mapLanguageCodes('ga', 'irish');
  Smart.Plurals.defineRule('irish', function pluralRule_irish(value, choices) {
    // singular used for 1
    // special case for 2
    var singular = (value === 1);
    if (choices === 2) return (singular ? 0 : 1);

    var two = (value === 2);
    return (singular ? 0 : two ? 1 : 2);
  });
})();
