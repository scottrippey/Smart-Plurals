(function() {
  /**
   * Baltic family
   *  Lithuanian
   */
  Smart.Plurals.mapLanguageCodes('lt', 'lithuanian');
  Smart.Plurals.defineRule('lithuanian', function pluralRule_lithuanian(value, choices) {
    // singular used for numbers ending in 1 (1, 21, 31, 41...)
    // special case for numbers ending in 12-19 (12-19, 112-119, 212-219...)
    var singular = (value % 10 === 1 && value % 100 != 11);
    if (choices === 2) return singular ? 0 : 1;

    var few = (value % 100 >= 12 && value % 100 <= 19);
    return singular ? 0 : few ? 1 : 2;
  });
})();
