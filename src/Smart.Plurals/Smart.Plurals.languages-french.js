/**
 * Romanic family
 *  French, Brazilian Portuguese
 */
Smart.Plurals.defineRule('french,fr,pt-br', function pluralRule_french(value, choices) {
	// singular used for 0 and 1
	var singular = (value === 0 || value === 1);
	return (singular ? 0 : 1);
});
