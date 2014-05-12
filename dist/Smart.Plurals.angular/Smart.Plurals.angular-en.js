angular.module('smart', [])
	.filter('plural', ['SmartPlurals', function(SmartPlurals) {
		var pluralFilter = function(value, choices_) {
			var choices = Array.prototype.slice.call(arguments, 1);
			var rule = SmartPlurals.getRule();
			var choice = rule(value, choices);
			return choice;
		};
		return pluralFilter;
	}])
	.factory('SmartPlurals', [function() {
		var Smart = { };

		// Embed the Smart.Plurals source: 


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
		

		return Smart.Plurals;
	}]);
