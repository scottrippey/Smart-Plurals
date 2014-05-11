module.exports = function(grunt) {

	grunt.registerTask('build-angular', [ 'concat:ANGULAR-ALL', 'concat:ANGULAR-EN', 'uglify:ANGULAR-MIN', 'jasmine:ANGULAR' ]);

	grunt.mergeConfig({
		watch: {
			'ANGULAR': {
				files: [
					'src/Smart.Plurals.angular/Smart.Plurals.angular.js.template'
					,'dist/Smart.Plurals/Smart.Plurals.all.js'
				]
				, tasks: [ 'build-angular' ]
			}
		}
		,
		concat: {
			'ANGULAR-ALL': {
				options: { process: { data: {
					getSmartPluralsSourceCode: function(indent) {
						var source = grunt.file.read('dist/Smart.Plurals/Smart.Plurals.all.js');
						return source.replace(/\n/g, '\n' + indent);
					}
				}}}
				, files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js', src: [ 'src/Smart.Plurals.angular/Smart.Plurals.angular.js.template' ] }
				]
			}
			,
			'ANGULAR-EN': {
				options: { process: { data: {
					getSmartPluralsSourceCode: function(indent) {
						var source = grunt.file.read('dist/Smart.Plurals/Smart.Plurals.en.js');
						return source.replace(/\n/g, '\n' + indent);
					}
				}}}
				, files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-en.js', src: [ 'src/Smart.Plurals.angular/Smart.Plurals.angular.js.template' ] }
				]
			}
		}
		,
		uglify: {
			'ANGULAR-MIN': {
				files: [
					{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all-min.js', src: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-all.js' }
					,{ dest: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-en-min.js', src: 'dist/Smart.Plurals.angular/Smart.Plurals.angular-en.js' }
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
