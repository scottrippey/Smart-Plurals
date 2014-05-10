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
