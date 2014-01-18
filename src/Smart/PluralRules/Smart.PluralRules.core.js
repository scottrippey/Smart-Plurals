(function(window){
  if (!window.Smart) window.Smart = {};

  Smart.PluralRules = {
    _codeMap: {} // Map of language codes to rule names
    , _rules: {} // Map of rule names to rules

    , _defaultCode: 'en'
    , _defaultRule: null
    , setDefault: function(languageCode) {
      this._defaultCode = languageCode.toLowerCase();
      this._defaultRule = null; // Lazy-loaded
    }

    , mapLanguageCodes: function(languageCodes, ruleName) {
      languageCodes = ',' + languageCodes.toLowerCase() + ',';
      ruleName = ruleName.toLowerCase();

      this._codeMap[languageCodes] = ruleName;
    }
    , defineRule: function(ruleName, pluralRule) {
      ruleName = ruleName.toLowerCase();

      this._rules[ruleName] = pluralRule;
    }
    , getRule: function(languageCode) {
      // Calling this with no parameters will return the default:
      if (!languageCode) {
        return this._defaultRule || (this._defaultRule = this.getRule(this._defaultCode));
      }

      languageCode = languageCode.toLowerCase();

      // You can look for a rule by name:
      if (languageCode in this._rules) {
        return this._rules[languageCode];
      }

      // Search for an "exact match" (either 2 letter code or 4 letter code)
      var exactLanguageCode = ',' + languageCode + ',';
      for (var languageCodes in this._codeMap) {
        if (!this._codeMap.hasOwnProperty(languageCodes)) continue;

        var isExactMatch = (languageCodes.indexOf(exactLanguageCode) !== -1);
        if (isExactMatch) {
          var ruleName = this._codeMap[languageCodes];
          return this._rules[ruleName];
        }
      }

      // Search for a "generic match" (2 letter code)
      if (languageCode.indexOf('-') !== -1) {
        var twoLetterCode = languageCode.split('-')[0];
        return this.getRule(twoLetterCode);
      } else {
        return null;
      }
    }
  };

})(this);
