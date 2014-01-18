module.exports = function(grunt) {

  grunt.registerTask('PluralRules', [ 'concat:PluralRules', 'uglify:PluralRules', 'jshint:PluralRules' ])

  var srcSmartPluralRules = '../src/Smart/PluralRules', dest = '../dist/PluralRules';
  var englishOnly = [
    srcSmartPluralRules + '/Smart.PluralRules.core.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-english.js'
  ];
  var allFiles = [
    srcSmartPluralRules + '/Smart.PluralRules.core.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-english.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-czech.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-french.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-irish.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-latvian.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-lithuanian.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-polish.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-romanian.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-russian.js'
    , srcSmartPluralRules + '/Smart.PluralRules.languages-slovenian.js'
  ];

  grunt.mergeConfig({
    concat: {
      'PluralRules': {
        files: [
          { dest: dest + '/Smart.PluralRules.all.js', src: allFiles }
          , { dest: dest + '/Smart.PluralRules.en.js', src: englishOnly }
        ]
      }
    }
    ,
    uglify: {
      'PluralRules': {
        files: [
          { dest: dest + '/Smart.PluralRules.all.min.js', src: allFiles }
          , { dest: dest + '/Smart.PluralRules.en.min.js', src: englishOnly }
        ]
      }
    }
    ,
    jshint: {
      'PluralRules': {
        src: allFiles
      }
    }
    ,
    watch: {
      'PluralRules': {
        files: allFiles
        , tasks: [ 'PluralRules' ]
      }
    }
  });
};
