module.exports = function(grunt) {

  grunt.mergeConfig({
    bump: {
      options: {
        files: [ 'package.json', 'bower.json' ],
        commit: false, createTag: false, push: false
      }
    }
  });


};
