
Smart = this.Smart || {};
if (typeof module === 'object') {
  module.exports = Smart;
}

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
     * Defines a language rule.
     *
     * @param {String} ruleName - An arbitrary name to identify the rule
     * @param {function(value, choices)} pluralRule - The rule; see getRule for a description.
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
     * Associates a list of language codes with a rule.
     *
     * @param {String} languageCodes - A comma-separated list of 2-letter or 4-letter language codes
     * @param {String} ruleName - The name of the rule to associate with these language codes
     */
    mapLanguageCodes: function(languageCodes, ruleName) {
      languageCodes = ',' + languageCodes.toLowerCase() + ',';
      ruleName = ruleName.toLowerCase();

      codeMap[languageCodes] = ruleName;

      if (!defaultCode) {
        defaultCode = languageCodes.split(',')[1];
      }
    }
    ,
    /**
     * Sets the default language rule.
     *
     * @param {String} languageCode - 2-letter or 4-letter language code
     */
    setDefault: function(languageCode) {
      defaultCode = languageCode.toLowerCase();
      defaultRule = null; // Lazy-loaded
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
