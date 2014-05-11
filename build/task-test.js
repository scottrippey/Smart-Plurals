module.exports = function(grunt) {
	grunt.registerTask('test', [ 'jasmine' ]);

	grunt.mergeConfig({
		jasmine: {
			'PLURALS': {
				src: [
					'dist/Smart.Plurals/Smart.Plurals.all.js'
				]
				, options: {
					specs: [
						'test/Smart.Plurals/**/*.js'
					]
				}
			}
			,
			'ANGULARJS': {
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
