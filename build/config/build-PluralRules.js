module.exports = function(grunt) {

  grunt.registerTask('PluralRules', [ 'concat:PluralRules', 'jshint:PluralRules' ])

  var src = '../src', dest = '../dist';
  var files = [
    src + '/Smart/PluralRules/Smart.PluralRules.core.js'
  ];

  grunt.mergeConfig({
    concat: {
      'PluralRules': {
        files: [
          { dest: dest + '/Smart.PluralRules.js', src: files }
        ]
      }
    }
    ,
    jshint: {
      'PluralRules': {
        src: files
      }
    }
    ,
    watch: {
      'PluralRules': {
        src: files
        , tasks: [ 'PluralRules' ]
      }
    }
  });
};
