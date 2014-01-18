module.exports = function(grunt) {

  grunt.mergeConfig({
    bump: {
      options: {
        commit: false, createTag: false, push: false
      }
    }
  });


};
