module.exports = function(grunt) {
  grunt.registerTask('increment', [ 'release:INCREMENT' ]);
  //grunt.registerTask('publish', [ 'release:INCREMENT' ]);
  grunt.mergeConfig({
    release: {
      options: {
        bump: false, add: false, commit: false, tag: false, push: false, npm: false
      }
      ,
      'INCREMENT': {
        options: {
          bump: true
        }
      }
      ,
      'NPM-PUBLISH': {
        options: {
          npm: true
        }
      }
    }
  });
};
