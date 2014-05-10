angular.module('smart', [])
  .filter('plural', ['SmartPlurals', function(SmartPlurals) {
    var pluralFilter = function(value, choices_) {
      var choices = Array.prototype.slice.call(arguments, 1);
      return SmartPlurals.getRule()(value, choices);
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
	
	  var codeMap = {} // Map of language codes to rule names
	    , rules = {} // Map of rule names to rules
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
	
	      languageCode = languageCode.toLowerCase();
	
	      // You can look for a rule by name:
	      if (languageCode in rules) {
	        return rules[languageCode];
	      }
	
	      // Search for an "exact match" (either 2-letter code or 4-letter code)
	      var exactLanguageCode = ',' + languageCode + ',';
	      for (var languageCodes in codeMap) {
	        if (!codeMap.hasOwnProperty(languageCodes)) continue;
	
	        var isExactMatch = (languageCodes.indexOf(exactLanguageCode) !== -1);
	        if (isExactMatch) {
	          var ruleName = codeMap[languageCodes];
	          return rules[ruleName];
	        }
	      }
	
	      // Search for a "generic match" (2-letter code)
	      if (languageCode.indexOf('-') !== -1) {
	        var twoLetterCode = languageCode.split('-')[0];
	        return this.getRule(twoLetterCode);
	      } else {
	        return null;
	      }
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
	     * @param {String} ruleName - An arbitrary name to identify the rule.  Used by defineLanguageCodes
	     * @param {function({Number} value, {Number} choices)} pluralRule - The rule; see getRule for a description.
	     */
	    defineRule: function(ruleName, pluralRule) {
	      ruleName = ruleName.toLowerCase();
	
	      var normalizedRule = function(value, choices) {
	        if (typeof choices !== 'number' && typeof choices.length === 'number') {
	          return choices[pluralRule(value, choices.length)];
	        } else {
	          return pluralRule(value, choices);
	        }
	      };
	
	      rules[ruleName] = normalizedRule;
	    }
	    ,
	    /**
	     * Associates a list of language codes with a named rule.
	     *
	     * @param {String} languageCodes - A comma-separated list of 2-letter or 4-letter language codes
	     * @param {String} ruleName - The name of the rule to associate with these language codes
	     */
	    defineLanguageCodes: function(languageCodes, ruleName) {
	      languageCodes = ',' + languageCodes.toLowerCase() + ',';
	      ruleName = ruleName.toLowerCase();
	
	      codeMap[languageCodes] = ruleName;
	
	      if (!defaultCode) {
	        this.setDefaultRule(languageCodes.split(',')[1]);
	      }
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
	Smart.Plurals.defineLanguageCodes('en,de,nl,sv,da,no,nn,nb,fo,es,pt,it,bg,el,fi,et,he,eo,hu,tr', 'english');
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
	
	/**
	 * Slavic family
	 *  Czech, Slovak
	 */
	Smart.Plurals.defineLanguageCodes('cs,sk', 'czech');
	Smart.Plurals.defineRule('czech', function pluralRule_czech(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('fr,pt-br', 'french');
	Smart.Plurals.defineRule('french', function pluralRule_french(value, choices) {
	  // singular used for 0 and 1
	  var singular = (value === 0 || value === 1);
	  return (singular ? 0 : 1);
	});
	
	/**
	 * Celtic
	 *  Gaeilge (Irish)
	 */
	Smart.Plurals.defineLanguageCodes('ga', 'irish');
	Smart.Plurals.defineRule('irish', function pluralRule_irish(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('lv', 'latvian');
	Smart.Plurals.defineRule('latvian', function pluralRule_latvian(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('lt', 'lithuanian');
	Smart.Plurals.defineRule('lithuanian', function pluralRule_lithuanian(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('pl', 'polish');
	Smart.Plurals.defineRule('polish', function pluralRule_polish(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('ro', 'romanian');
	Smart.Plurals.defineRule('romanian', function pluralRule_romanian(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('ru,uk,sr,hr', 'russian');
	Smart.Plurals.defineRule('russian', function pluralRule_russian(value, choices) {
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
	Smart.Plurals.defineLanguageCodes('sl', 'slovenian');
	Smart.Plurals.defineRule('slovenian', function pluralRule_slovenian(value, choices) {
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
	

    return Smart.Plurals;
  }]);
