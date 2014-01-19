
Smart = this.Smart || {};
if (typeof module === 'object') {
  module.exports = Smart;
}

Smart.Plurals = {
  _codeMap: {} // Map of language codes to rule names
  , _rules: {} // Map of rule names to rules

  , _defaultCode: null
  , _defaultRule: null

  ,
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
      return this._defaultRule || (this._defaultRule = this.getRule(this._defaultCode));
    }

    languageCode = languageCode.toLowerCase();

    // You can look for a rule by name:
    if (languageCode in this._rules) {
      return this._rules[languageCode];
    }

    // Search for an "exact match" (either 2-letter code or 4-letter code)
    var exactLanguageCode = ',' + languageCode + ',';
    for (var languageCodes in this._codeMap) {
      if (!this._codeMap.hasOwnProperty(languageCodes)) continue;

      var isExactMatch = (languageCodes.indexOf(exactLanguageCode) !== -1);
      if (isExactMatch) {
        var ruleName = this._codeMap[languageCodes];
        return this._rules[ruleName];
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

    this._rules[ruleName] = normalizedRule;
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

    this._codeMap[languageCodes] = ruleName;

    if (!this._defaultCode) {
      this._defaultCode = languageCodes.split(',')[1];
    }
  }
  ,
  /**
   * Sets the default language rule.
   *
   * @param {String} languageCode - 2-letter or 4-letter language code
   */
  setDefault: function(languageCode) {
    this._defaultCode = languageCode.toLowerCase();
    this._defaultRule = null; // Lazy-loaded
  }
};

