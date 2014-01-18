module.exports = function(grunt) {
  grunt.registerTask('increment', [ 'release', 'Plurals-release' ]);
  grunt.mergeConfig({
    release: {
      options: {
        bump: true // We only want to bump
        , add: false, commit: false, tag: false, push: false, pushTags: false, npm: false
      }
    }
  });
};
