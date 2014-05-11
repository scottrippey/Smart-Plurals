module.exports = function(grunt) {

	grunt.registerTask('build-angular', [ 'concat:ANGULAR-ALL', 'uglify:ANGULAR-ALL-MIN', 'jasmine:ANGULAR' ]);

	grunt.mergeConfig({
		watch: {
			'ANGULAR': {
				files: [
					'src/Smart.Plurals.angular/Smart.Plurals.angular-all.js.template'
					,'dist/Smart.Plurals/Smart.Plurals.all.js'
				]
				, tasks: [ 'build-angular' ]
			}
		}
		,
		concat: {
			'ANGULAR-ALL': {
				options: {
					process: true
				}
				, files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js', src: [ 'src/Smart.Plurals.angular/Smart.Plurals.angular-all.js.template' ] }
				]
			}
		}
		,
		uglify: {
			'ANGULAR-ALL-MIN': {
				files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all-min.js', src: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js' }
				]
			}
		}
		,
		jasmine: {
			'ANGULAR': {
				src: [
					'bower_components/angular/angular.js'
					, 'bower_components/angular-mocks/angular-mocks.js'

					, 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js'
				]
				, options: {
					specs: [
						'test/Smart.Plurals.angular/**/*.js'
					]
				}
			}
		}
});
};
