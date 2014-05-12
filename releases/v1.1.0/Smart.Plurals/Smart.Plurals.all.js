// Create namespace:
if (typeof Smart !== 'object')
	Smart = {};

(function() {

	var rules = {} // Map of language codes to rules
		, defaultCode = null
		, defaultRule = null;

	Smart.Plurals = {
		/**
		 * Retrieves a plural rule, based on the supplied language code.
		 * If no languageCode is specified, the default rule will be returned.
		 *
		 * A plural rule is a function that takes in a value
		 * and determines whether it should be singular form, plural form,
		 * or even other forms, depending on the number of choices.
		 *
		 * @param {String} [languageCode] - Optional - a 2-letter or 4-letter language code, or the full ruleName.
		 * @returns {function({Number} value, {Number|Array} choices)}
		 */
		getRule: function(languageCode) {
			// Calling this with no parameters will return the default:
			if (!languageCode) {
				return defaultRule || (defaultRule = this.getRule(defaultCode));
			}

			// Normalize:
			languageCode = ',' + languageCode.toLowerCase() + ',';

			// Search for an "exact match":
			for (var languageCodes in rules) {
				if (!rules.hasOwnProperty(languageCodes)) continue;

				var isExactMatch = (languageCodes.indexOf(languageCode) !== -1);
				if (isExactMatch) {
					return rules[languageCodes];
				}
			}

			// If we've got a 4-letter code, search for a "generic match" (2-letter code):
			var dash = languageCode.indexOf('-');
			if (dash !== -1) {
				var twoLetterCode = languageCode.substring(1, dash);
				return this.getRule(twoLetterCode);
			}

			return null;
		}
		,
		/**
		 * Sets the default language rule.
		 *
		 * @param {String} languageCode - 2-letter or 4-letter language code
		 */
		setDefaultRule: function(languageCode) {
			defaultCode = languageCode.toLowerCase();
			defaultRule = null; // it's lazy loaded
		}
		,
		/**
		 * Defines a language rule.
		 *
		 * @param {String} languageCodes - A comma-separated list of 2-letter or 4-letter language codes
		 * @param {function({Number} value, {Number} choices)|String} pluralRule - The rule; see getRule for a description.
		 */
		defineRule: function(languageCodes, pluralRule) {
			// Normalize:
			languageCodes = ',' + languageCodes.toLowerCase() + ',';

			var normalizedRule;
			if (typeof pluralRule === 'string') {
				// Allows for aliases
				normalizedRule = this.getRule(pluralRule);
			} else {
				normalizedRule = function (value, choices) {
					if (typeof choices === 'number') {
						return pluralRule(value, choices);
					} else if (typeof choices.length === 'number') {
						return choices[pluralRule(value, choices.length)];
					}
				};
			}

			rules[languageCodes] = normalizedRule;

			if (!defaultCode) {
				this.setDefaultRule(languageCodes.split(',')[1]);
			}

			return normalizedRule;
		}
	};

})();

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
Smart.Plurals.defineRule('english,en,de,nl,sv,da,no,nn,nb,fo,es,pt,it,bg,el,fi,et,he,eo,hu,tr',
	function pluralRule_english(value, choices) {
		// singular used for 1
		// special cases for 0 and negative
		var singular = (value === 1);
		if (choices === 2) return (singular ? 0 : 1);

		var zero = (value === 0);
		if (choices === 3) return (zero ? 0 : singular ? 1 : 2);

		var negative = (value < 0);
		return (negative ? 0 : zero ? 1 : singular ? 2 : 3);
	}
);

/**
 * Slavic family
 *  Czech, Slovak
 */
Smart.Plurals.defineRule('czech,cs,sk', function pluralRule_czech(value, choices) {
	// singular used for 1
	// special case for 2-4
	var singular = (value === 1);
	if (choices === 2) return singular ? 0 : 1;

	var few = (value >= 2 && value <= 4);
	return singular ? 0 : few ? 1 : 2;
});

/**
 * Romanic family
 *  French, Brazilian Portuguese
 */
Smart.Plurals.defineRule('french,fr,pt-br', function pluralRule_french(value, choices) {
	// singular used for 0 and 1
	var singular = (value === 0 || value === 1);
	return (singular ? 0 : 1);
});

/**
 * Celtic
 *  Gaeilge (Irish)
 */
Smart.Plurals.defineRule('irish,ga', function pluralRule_irish(value, choices) {
	// singular used for 1
	// special case for 2
	var singular = (value === 1);
	if (choices === 2) return (singular ? 0 : 1);

	var two = (value === 2);
	return (singular ? 0 : two ? 1 : 2);
});

/**
 * Baltic family
 *  Latvian
 */
Smart.Plurals.defineRule('latvian,lv', function pluralRule_latvian(value, choices) {
	// singular used for 1, 21, 31, 41... -- but not 11, 111, 211, 311, 411...
	// special case for 0
	var singular = (value % 10 === 1 && value % 100 != 11);
	if (choices === 2) return (singular ? 0 : 1);

	var zero = (value === 0);
	return (zero ? 0 : singular ? 1 : 2);
});

/**
 * Baltic family
 *  Lithuanian
 */
Smart.Plurals.defineRule('lithuanian,lt', function pluralRule_lithuanian(value, choices) {
	// singular used for numbers ending in 1 (1, 21, 31, 41...)
	// special case for numbers ending in 12-19 (12-19, 112-119, 212-219...)
	var singular = (value % 10 === 1 && value % 100 != 11);
	if (choices === 2) return singular ? 0 : 1;

	var few = (value % 100 >= 12 && value % 100 <= 19);
	return singular ? 0 : few ? 1 : 2;
});

/**
 * Slavic family
 *  Polish
 */
Smart.Plurals.defineRule('polish,pl', function pluralRule_polish(value, choices) {
	// singular used for 1
	// special case for numbers ending in 2-4, except for 12-14 (2-4, 22-24, 32-34...)
	var singular = (value === 1);
	if (choices === 2) return singular ? 0 : 1;

	var few = (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20));
	return singular ? 0 : few ? 1 : 2;
});

/**
 * Romanic family
 *  Romanian
 */
Smart.Plurals.defineRule('romanian,ro', function pluralRule_romanian(value, choices) {
	// singular used for 1
	// special case for 0 and numbers ending in 01-19 (0, 2-19, 101-119, 201-219...)
	var singular = (value === 1);
	if (choices === 2) return (singular ? 0 : 1);

	var few = (value === 0 || (value % 100 >= 1 && value % 100 <= 19));
	return (singular ? 0 : few ? 1 : 2);
});

/**
 * Slavic family
 *  Russian, Ukrainian, Serbian, Croatian
 */
Smart.Plurals.defineRule('russian,ru,uk,sr,hr', function pluralRule_russian(value, choices) {
	// singular used for numbers ending in 1, except 11 (1, 21, 31...)
	// special case for numbers ending in 2-4, except 12-14 (2-4, 22-24, 32-34...)
	// numbers ending in 11-14 use plural (11-14, 111-114, 211-214...)
	var singular = (value % 10 === 1 && value % 100 != 11);
	if (choices === 2) return singular ? 0 : 1;

	var few = (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20));
	return singular ? 0 : few ? 1 : 2;
});

/**
 * Slavic family
 *  Slovenian
 */
Smart.Plurals.defineRule('slovenian,sl', function pluralRule_slovenian(value, choices) {
	// singular used for numbers ending in 01 (1, 101, 201...)
	// special case for numbers ending in 02 (2, 102, 202...)
	// special case for numbers ending in 03-04 (3-4, 103-104, 203-204...)
	var singular = (value % 100 === 1);
	if (choices === 2) return singular ? 0 : 1;

	var two = (value % 100 === 2);
	if (choices === 3) return singular ? 0 : two ? 1 : 2;

	var few = (value % 100 === 3 || value % 100 === 4);
	return singular ? 0 : two ? 1 : few ? 2 : 3;
});
