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
