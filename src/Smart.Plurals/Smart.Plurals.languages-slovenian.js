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
