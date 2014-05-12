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
