module.exports = function(grunt) {
  grunt.registerTask('default', [ 'Plurals' ]);
  grunt.registerTask('test', [ 'jasmine' ]);

  var pkg;
  grunt.mergeConfig({
    pkg: function() { return pkg || (pkg = grunt.file.readJSON('package.json')); }
    ,
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
