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

(function() {
  /**
   * Much of this language information came from the following url:
   * http://www.gnu.org/s/hello/manual/gettext/Plural-forms.html
   * The language codes came from:
   * http://www.loc.gov/standards/iso639-2/php/code_list.php
   */


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
  PluralRules.mapLanguageCodes('en,de,nl,sv,da,no,nn,nb,fo,es,pt,it,bg,el,fi,et,he,eo,hu,tr', 'english');
  PluralRules.defineRule('english', function PluralRule_english(value, choices) {
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
   * Romanic family
   *  French, Brazilian Portuguese
   */
  PluralRules.mapLanguageCodes('fr,pt-br', 'french');
  PluralRules.defineRule('french', function PluralRule_french(value, choices) {
    // singular used for 0 and 1
    var singular = (value === 0 || value === 1);
    return (singular ? 0 : 1);
  });

  /**
   * Baltic family
   *  Latvian
   */
  PluralRules.mapLanguageCodes('lv', 'latvian');
  PluralRules.defineRule('latvian', function PluralRule_latvian(value, choices) {
    // singular used for 1, 21, 31, 41... -- but not 11, 111, 211, 311, 411...
    // special case for 0
    var singular = (value % 10 === 1 && value % 100 != 11);
    if (choices === 2) return (singular ? 0 : 1);

    var zero = (value === 0);
    return (zero ? 0 : singular ? 1 : 2);
  });

  /**
   * Celtic
   *  Gaeilge (Irish)
   */
  PluralRules.mapLanguageCodes('ga', 'irish');
  PluralRules.defineRule('irish', function PluralRule_irish(value, choices) {
    // singular used for 1
    // special case for 2
    var singular = (value === 1);
    if (choices === 2) return (singular ? 0 : 1);

    var two = (value === 2);
    return (singular ? 0 : two ? 1 : 2);
  });

  /**
   * Romanic family
   *  Romanian
   */
  PluralRules.mapLanguageCodes('ro', 'romanian');
  PluralRules.defineRule('romanian', function PluralRule_romanian(value, choices) {
    // singular used for 1
    // special case for 0 and numbers ending in 01-19 (0, 2-19, 101-119, 201-219...)
    var singular = (value === 1);
    if (choices === 2) return (singular ? 0 : 1);

    var few = (value === 0 || (value % 100 >= 1 && value % 100 <= 19));
    return (singular ? 0 : few ? 1 : 2);
  });

  /**
   * Baltic family
   *  Lithuanian
   */
  PluralRules.mapLanguageCodes('lt', 'lithuanian');
  PluralRules.defineRule('lithuanian', function PluralRule_lithuanian(value, choices) {
    // singular used for numbers ending in 1 (1, 21, 31, 41...)
    // special case for numbers ending in 12-19 (12-19, 112-119, 212-219...)
    var singular = (value % 10 === 1 && value % 100 != 11);
    if (choices === 2) return singular ? 0 : 1;

    var few = (value % 100 >= 12 && value % 100 <= 19);
    return singular ? 0 : few ? 1 : 2;
  });

  /**
   * Slavic family
   *  Russian, Ukrainian, Serbian, Croatian
   */
  PluralRules.mapLanguageCodes('ru,uk,sr,hr', 'russian');
  PluralRules.defineRule('russian', function PluralRule_russian(value, choices) {
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
   *  Czech, Slovak
   */
  PluralRules.mapLanguageCodes('cs,sk', 'czech');
  PluralRules.defineRule('czech', function PluralRule_czech(value, choices) {
    // singular used for 1
    // special case for 2-4
    var singular = (value === 1);
    if (choices === 2) return singular ? 0 : 1;

    var few = (value >= 2 && value <= 4);
    return singular ? 0 : few ? 1 : 2;
  });

  /**
   * Slavic family
   *  Polish
   */
  PluralRules.mapLanguageCodes('pl', 'polish');
  PluralRules.defineRule('polish', function PluralRule_polish(value, choices) {
    // singular used for 1
    // special case for numbers ending in 2-4, except for 12-14 (2-4, 22-24, 32-34...)
    var singular = (value === 1);
    if (choices === 2) return singular ? 0 : 1;

    var few = (value % 10 >= 2 && value % 10 <= 4 && (value % 100 < 10 || value % 100 >= 20));
    return singular ? 0 : few ? 1 : 2;
  });

  /**
   * Slavic family
   *  Slovenian
   */
  PluralRules.mapLanguageCodes('sl', 'slovenian');
  PluralRules.defineRule('slovenian', function PluralRule_slovenian(value, choices) {
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


})();
