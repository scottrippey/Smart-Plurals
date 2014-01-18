module.exports = function(grunt) {
  grunt.registerTask('default', [ 'PluralRules' ]);

  grunt.mergeConfig({
    concat: {
      options: {}
    }
    ,
    uglify: {
      options: {}
    }
    ,
    jshint: {
      options: {
        laxcomma: true
      }
    }
    ,
    watch: {
      options: {}
    }
  });
};
