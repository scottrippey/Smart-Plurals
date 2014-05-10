module.exports = function(grunt) {

  grunt.registerTask('Plurals', [ 'concat:PLURALS', 'uglify:PLURALS', 'jshint:PLURALS' ]);

  var englishOnly = [
    'src/Smart/Plurals/Smart.Plurals.core.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-english.js'
  ];
  var allFiles = [
    'src/Smart/Plurals/Smart.Plurals.core.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-english.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-czech.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-french.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-irish.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-latvian.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-lithuanian.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-polish.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-romanian.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-russian.js'
    , 'src/Smart/Plurals/Smart.Plurals.languages-slovenian.js'
  ];


  grunt.mergeConfig({
    concat: {
      'PLURALS': {
        files: [
          { dest: 'dist/Smart.Plurals/Smart.Plurals.all.js', src: allFiles }
          , { dest: 'dist/Smart.Plurals/Smart.Plurals.en.js', src: englishOnly }
        ]
      }
    }
    ,
    uglify: {
      'PLURALS': {
        files: [
          { dest: 'dist/Smart.Plurals/Smart.Plurals.all-min.js', src: allFiles }
          , { dest: 'dist/Smart.Plurals/Smart.Plurals.en-min.js', src: englishOnly }
        ]
      }
    }
    ,
    jshint: {
      'PLURALS': {
        src: allFiles
      }
    }
    ,
    watch: {
      'PLURALS': {
        files: allFiles
        , tasks: [ 'Plurals' ]
      }
    }
  });
};
