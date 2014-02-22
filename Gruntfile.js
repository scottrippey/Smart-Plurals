module.exports = function(grunt) {
  require('grunt-config-merge')(grunt);

  require('./build/default-options.js')(grunt);
  require('./build/task-bump.js')(grunt);
  require('./build/task-release.js')(grunt);
  require('./build/task-Plurals.js')(grunt);
  require('./build/task-NodeJS.js')(grunt);

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-shell');
  grunt.loadNpmTasks('grunt-bump');

};
