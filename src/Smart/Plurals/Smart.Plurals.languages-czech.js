/**
 * Slavic family
 *  Czech, Slovak
 */
Smart.Plurals.mapLanguageCodes('cs,sk', 'czech');
Smart.Plurals.defineRule('czech', function pluralRule_czech(value, choices) {
  // singular used for 1
  // special case for 2-4
  var singular = (value === 1);
  if (choices === 2) return singular ? 0 : 1;

  var few = (value >= 2 && value <= 4);
  return singular ? 0 : few ? 1 : 2;
});
