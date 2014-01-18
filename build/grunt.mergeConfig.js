module.exports = function(grunt) {
	var _ = require('lodash');

	grunt.config.merge = function(gruntConfig) {
		if (!grunt.config.data) {
			grunt.config.data = {};
		}
		_.merge(grunt.config.data, gruntConfig);
	};

	grunt.mergeConfig = grunt.config.merge;
};
