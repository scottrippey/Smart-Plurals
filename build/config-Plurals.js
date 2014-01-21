module.exports = function(grunt) {

  grunt.registerTask('Plurals', [ 'concat:PLURALS', 'uglify:PLURALS', 'jshint:PLURALS', 'jasmine:PLURALS' ]);

  var src = 'src/Smart/Plurals'
    , dest = 'dist'
    , releases = 'releases'
    , test = 'test/Plurals'
    ;
  var englishOnly = [
    src + '/Smart.Plurals.core.js'
    , src + '/Smart.Plurals.languages-english.js'
  ];
  var allFiles = [
    src + '/Smart.Plurals.core.js'
    , src + '/Smart.Plurals.languages-english.js'
    , src + '/Smart.Plurals.languages-czech.js'
    , src + '/Smart.Plurals.languages-french.js'
    , src + '/Smart.Plurals.languages-irish.js'
    , src + '/Smart.Plurals.languages-latvian.js'
    , src + '/Smart.Plurals.languages-lithuanian.js'
    , src + '/Smart.Plurals.languages-polish.js'
    , src + '/Smart.Plurals.languages-romanian.js'
    , src + '/Smart.Plurals.languages-russian.js'
    , src + '/Smart.Plurals.languages-slovenian.js'
  ];

  var allTests = [
    test + '/**/*.js'
  ];

  grunt.mergeConfig({
    concat: {
      'PLURALS': {
        files: [
          { dest: dest + '/Smart.Plurals.all.js', src: allFiles }
          , { dest: dest + '/Smart.Plurals.en.js', src: englishOnly }
        ]
      }
      ,
      // Just copy to the releases folder:
      'PLURALS-RELEASE': {
        files: [
          { dest: releases + '/v<%= pkg.version %>/Smart.Plurals.all-<%= pkg.version %>.js', src: dest + '/Smart.Plurals.all.js' }
          ,{ dest: releases + '/v<%= pkg.version %>/Smart.Plurals.all-<%= pkg.version %>.min.js', src: dest + '/Smart.Plurals.all.min.js' }
          ,{ dest: releases + '/v<%= pkg.version %>/Smart.Plurals.en-<%= pkg.version %>.js', src: dest + '/Smart.Plurals.en.js' }
          ,{ dest: releases + '/v<%= pkg.version %>/Smart.Plurals.en-<%= pkg.version %>.min.js', src: dest + '/Smart.Plurals.en.min.js' }
        ]
      }
    }
    ,
    uglify: {
      'PLURALS': {
        files: [
          { dest: dest + '/Smart.Plurals.all.min.js', src: allFiles }
          , { dest: dest + '/Smart.Plurals.en.min.js', src: englishOnly }
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
    jasmine: {
      'PLURALS': {
        src: allFiles
        , options: {
          specs: allTests
        }
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
