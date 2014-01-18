(function() {
  /**
   * Romanic family
   *  French, Brazilian Portuguese
   */
  Smart.Plurals.mapLanguageCodes('fr,pt-br', 'french');
  Smart.Plurals.defineRule('french', function pluralRule_french(value, choices) {
    // singular used for 0 and 1
    var singular = (value === 0 || value === 1);
    return (singular ? 0 : 1);
  });
})();
