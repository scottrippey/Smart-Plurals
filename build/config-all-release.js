module.exports = function(grunt) {
  grunt.registerTask('release', [ 'Plurals', 'concat:Plurals-release' ]);

};
