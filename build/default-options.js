module.exports = function(grunt) {
	grunt.mergeConfig({
		pkg: grunt.file.readJSON('package.json')
		,
		concat: {
			options: {}
		}
		,
		uglify: {
			options: {
				report: 'gzip'
				, compress: { hoist_vars: true }
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
