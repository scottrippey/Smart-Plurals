module.exports = function(grunt) {
  grunt.registerTask('default', [ 'PluralRules' ]);
  grunt.registerTask('test', [ 'jasmine' ]);

  grunt.mergeConfig({
    concat: {
      options: {}
    }
    ,
    uglify: {
      options: {
        report: 'gzip'
      }
    }
    ,
    jshint: {
      options: {
        laxcomma: true
      }
    }
    ,
    watch: {
      options: {
        atBegin: true
      }
    }
  });
};
