(function() {
  /**
   * Germanic family
   *  English, German, Dutch, Swedish, Danish, Norwegian, Faroese
   * Romanic family
   *  Spanish, Portuguese, Italian, Bulgarian
   * Latin/Greek family
   *  Greek
   * Finno-Ugric family
   *  Finnish, Estonian
   * Semitic family
   *  Hebrew
   * Artificial
   *  Esperanto
   * Finno-Ugric family
   *  Hungarian
   * Turkic/Altaic family
   *  Turkish
   */
  Smart.Plurals.mapLanguageCodes('en,de,nl,sv,da,no,nn,nb,fo,es,pt,it,bg,el,fi,et,he,eo,hu,tr', 'english');
  Smart.Plurals.defineRule('english', function pluralRule_english(value, choices) {
    // singular used for 1
    // special cases for 0 and negative
    var singular = (value === 1);
    if (choices === 2) return (singular ? 0 : 1);

    var zero = (value === 0);
    if (choices === 3) return (zero ? 0 : singular ? 1 : 2);

    var negative = (value < 0);
    return (negative ? 0 : zero ? 1 : singular ? 2 : 3);
  });
})();
