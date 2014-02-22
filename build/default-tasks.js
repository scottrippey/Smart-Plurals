module.exports = function(grunt) {
  grunt.registerTask('default', [ 'Plurals', 'NodeJS', 'AngularJS' ]);
  grunt.registerTask('test', [ 'jasmine' ]);
};
