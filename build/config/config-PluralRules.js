module.exports = function(grunt) {

  grunt.registerTask('PluralRules', [ 'concat:PluralRules', 'uglify:PluralRules', 'jshint:PluralRules', 'jasmine:PluralRules' ])

  var src = '../src/Smart/PluralRules'
    , dest = '../dist/PluralRules'
    , test = '../test/PluralRules';
  var englishOnly = [
    src + '/Smart.PluralRules.core.js'
    , src + '/Smart.PluralRules.languages-english.js'
  ];
  var allFiles = [
    src + '/Smart.PluralRules.core.js'
    , src + '/Smart.PluralRules.languages-english.js'
    , src + '/Smart.PluralRules.languages-czech.js'
    , src + '/Smart.PluralRules.languages-french.js'
    , src + '/Smart.PluralRules.languages-irish.js'
    , src + '/Smart.PluralRules.languages-latvian.js'
    , src + '/Smart.PluralRules.languages-lithuanian.js'
    , src + '/Smart.PluralRules.languages-polish.js'
    , src + '/Smart.PluralRules.languages-romanian.js'
    , src + '/Smart.PluralRules.languages-russian.js'
    , src + '/Smart.PluralRules.languages-slovenian.js'
  ];

  var allTests = [
    test + '/**/*.js'
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
    jasmine: {
      'PluralRules': {
        src: allFiles
        , options: {
          specs: allTests
        }
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
