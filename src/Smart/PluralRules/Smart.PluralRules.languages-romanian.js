(function() {
  /**
   * Romanic family
   *  Romanian
   */
  Smart.PluralRules.mapLanguageCodes('ro', 'romanian');
  Smart.PluralRules.defineRule('romanian', function pluralRule_romanian(value, choices) {
    // singular used for 1
    // special case for 0 and numbers ending in 01-19 (0, 2-19, 101-119, 201-219...)
    var singular = (value === 1);
    if (choices === 2) return (singular ? 0 : 1);

    var few = (value === 0 || (value % 100 >= 1 && value % 100 <= 19));
    return (singular ? 0 : few ? 1 : 2);
  });
})();
