module.exports = function(grunt) {
	require('./build/grunt.mergeConfig.js')(grunt);

  require('./build/config-all-defaults.js')(grunt);
  require('./build/config-all-bump.js')(grunt);
  require('./build/config-all-release.js')(grunt);
  require('./build/config-Plurals.js')(grunt);

	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-jasmine');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-bump');

};
