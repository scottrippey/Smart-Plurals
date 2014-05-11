describe("Plurals", function() {

	describe("getRule", function() {
		var english = Smart.Plurals.getRule('en')
			, spanish = Smart.Plurals.getRule('es')
			, russian = Smart.Plurals.getRule('ru')
			, defaultRule = Smart.Plurals.getRule();

		it("accepts both language codes and rule names", function() {
			var english2 = Smart.Plurals.getRule('english');
			expect(english2).toBe(english);
		});
		it("is case insensitive", function() {
			var EN = Smart.Plurals.getRule('EN')
				, ENGLISH = Smart.Plurals.getRule('ENGLISH');
			expect(EN).toBe(english);
			expect(ENGLISH).toBe(english);
		});
		it("accepts 4-letter codes", function() {
			var EN_US = Smart.Plurals.getRule('en-US');
			expect(EN_US).toBe(english);
		});


		it("the English rule is the same as Spanish", function() {
			expect(english).toBe(spanish);
		});
		it("the English rule is NOT the same as Russian", function() {
			expect(russian).not.toBe(english);
		});
		it("returns null if the language is not defined", function() {
			var zz = Smart.Plurals.getRule('zz')
				, asdf = Smart.Plurals.getRule('asdf');
			expect(zz).toBe(null);
			expect(asdf).toBe(null);
		});

		describe("Default rule", function() {
			it("the default rule should be English", function() {
				expect(defaultRule).toBe(english);
			});
			it("should change the default", function() {
				Smart.Plurals.setDefaultRule('ru');
				var newDefaultRule = Smart.Plurals.getRule();

				expect(newDefaultRule).toBe(russian);

				// Reset:
				Smart.Plurals.setDefaultRule('en');
			});
		});
	});


	describe("Choices Parameter", function() {
		var english = Smart.Plurals.getRule('en');
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
		var english = Smart.Plurals.getRule('en');
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
