module.exports = function(grunt) {

	grunt.registerTask('AngularJS', [ 'concat:ANGULARJS', 'uglify:ANGULARJS-MIN' ]);

	grunt.mergeConfig({
		concat: {
			'ANGULARJS': {
				options: {
					process: true
				}
				, files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js', src: [ 'src/Smart.Plurals.angular/Smart.Plurals.angular-all.js.template' ] }
				]
			}
		}
		, uglify: {
			'ANGULARJS-MIN': {
				files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all-min.js', src: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js' }
				]
			}
		}
	});
};
