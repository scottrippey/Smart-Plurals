module.exports = function(grunt) {
  grunt.mergeConfig({
    pkg: grunt.file.readJSON('package.json')
    ,
    utils: {
      indent: function(text, indent) {
        return text.replace(/\n/g, '\n' + indent);
      }
    }
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
