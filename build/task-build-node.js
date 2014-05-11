module.exports = function(grunt) {

	grunt.registerTask('build-node', [ 'concat:NODEJS' ]);

	grunt.mergeConfig({
		concat: {
			'NODEJS': {
				options: {
					process: true
				}
				, files: [
					{ dest: 'dist/Smart.Plurals.node/Smart.Plurals.node-all.js', src: [ 'src/Smart.Plurals.node/Smart.Plurals.node-all.js.template' ] }
				]
			}
		}
	});
};
