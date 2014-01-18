/**
 * Baltic family
 *  Latvian
 */
Smart.Plurals.mapLanguageCodes('lv', 'latvian');
Smart.Plurals.defineRule('latvian', function pluralRule_latvian(value, choices) {
  // singular used for 1, 21, 31, 41... -- but not 11, 111, 211, 311, 411...
  // special case for 0
  var singular = (value % 10 === 1 && value % 100 != 11);
  if (choices === 2) return (singular ? 0 : 1);

  var zero = (value === 0);
  return (zero ? 0 : singular ? 1 : 2);
});
