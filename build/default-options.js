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
