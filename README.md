# Smart.Plurals

A collection of language-specific rules for determining the plurality of a number.
These rules are designed to help with the localization of your application.

The library is small and simple, minified and gzipped to under 500b.

## Examples

For example, English has 2 plural forms - 1 is singular, all other values are plural:

    var english = Smart.Plurals.getRule('en');
    english(0, [ 'singular', 'plural'  ]); // returns 'plural'
    english(1, [ 'singular', 'plural'  ]); // returns 'singular'
    english(2, [ 'singular', 'plural'  ]); // returns 'plural'

However, many languages have different rules, and some even have 3 or 4 different plural forms.
For example, Russian has 3 plural forms - numbers ending with 1 (such as 21, 31, 41) are singular;
numbers ending in 2-4 (22, 23, 24) are "few", and all others are plural:

    // (TODO: Improve this example with actual Russian words)
    var russian = Smart.Plurals.getRule('ru');
    russian(91, [ 'singular', 'few', 'plural' ]); // returns 'singular'
    russian(94, [ 'singular', 'few', 'plural' ]); // returns 'few'
    russian(99, [ 'singular', 'few', 'plural' ]); // returns 'plural'

## Download

This library is designed to be tiny, has no dependencies, and should be very easy to integrate into any application.
You can download rules for all languages at [dist/Plurals/Smart.Plurals.all.js],
or you can get just the English rule at [dist/Plurals/Smart.Plurals.all.js].

## Supported languages:

* Germanic family
**  English, German, Dutch, Swedish, Danish, Norwegian, Faroese
* Romanic family
**  Spanish, Portuguese, Italian, Bulgarian
* Latin/Greek family
**  Greek
* Finno-Ugric family
**  Finnish, Estonian
* Semitic family
**  Hebrew
* Artificial
**  Esperanto
* Finno-Ugric family
**  Hungarian
* Turkic/Altaic family
**  Turkish
* Slavic family
**  Czech, Slovak
* Romanic family
**  French, Brazilian Portuguese
* Celtic
**  Gaeilge (Irish)
* Baltic family
**  Latvian
* Baltic family
**  Lithuanian
* Slavic family
**  Polish
* Romanic family
**  Romanian
* Slavic family
**  Russian, Ukrainian, Serbian, Croatian
* Slavic family
**  Slovenian
