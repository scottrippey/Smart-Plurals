describe("PluralRules", function() {

  describe("Default rule", function() {
    var defaultRule = Smart.PluralRules.getRule()
      , english = Smart.PluralRules.getRule('en')
      , spanish = Smart.PluralRules.getRule('es')
      , russian = Smart.PluralRules.getRule('ru')
      ;
    it("the default rule should be English", function() {
      expect(defaultRule).toBe(english);
    });
    it("the English rule is the same as Spanish", function() {
      expect(english).toBe(spanish);
    });
    it("the English rule is NOT the same as Russian", function() {
      expect(russian).not.toBe(english);
    });
  });

  describe("Choices Parameter", function() {
    var english = Smart.PluralRules.getRule('en');
    it("should return an item if choices is an array", function() {
      expect(english(1, [ 'singular', 'plural' ])).toBe('singular');
    });
    it("should return an index if choices is a number", function() {
      expect(english(-1, 2)).toBe(1);
      expect(english(0, 2)).toBe(1);
      expect(english(1, 2)).toBe(0);
      expect(english(2, 2)).toBe(1);

      expect(english(-1, 3)).toBe(2);
      expect(english(0, 3)).toBe(0);
      expect(english(1, 3)).toBe(1);
      expect(english(2, 3)).toBe(2);

      expect(english(-1, 4)).toBe(0);
      expect(english(0, 4)).toBe(1);
      expect(english(1, 4)).toBe(2);
      expect(english(2, 4)).toBe(3);
    });

  });

  describe("English Rule", function() {
    var english = Smart.PluralRules.getRule('en');
    it("works with 2 choices", function() {
      expect(english(-1, [ 'singular', 'plural' ])).toBe('plural');
      expect(english(0, [ 'singular', 'plural' ])).toBe('plural');
      expect(english(0.9, [ 'singular', 'plural' ])).toBe('plural');
      expect(english(1, [ 'singular', 'plural' ])).toBe('singular');
      expect(english(1.1, [ 'singular', 'plural' ])).toBe('plural');
      expect(english(2, [ 'singular', 'plural' ])).toBe('plural');
    });
    it("works with 3 choices", function() {
      expect(english(-1, [ 'zero', 'singular', 'plural' ])).toBe('plural');
      expect(english(0, [ 'zero', 'singular', 'plural' ])).toBe('zero');
      expect(english(1, [ 'zero', 'singular', 'plural' ])).toBe('singular');
      expect(english(2, [ 'zero', 'singular', 'plural' ])).toBe('plural');
    });
    it("works with 4 choices", function() {
      expect(english(-1, [ 'negative', 'zero', 'singular', 'plural' ])).toBe('negative');
      expect(english(0, [ 'negative', 'zero', 'singular', 'plural' ])).toBe('zero');
      expect(english(1, [ 'negative', 'zero', 'singular', 'plural' ])).toBe('singular');
      expect(english(2, [ 'negative', 'zero', 'singular', 'plural' ])).toBe('plural');
    });

  });

});
