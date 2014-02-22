module.exports = function(grunt) {
  grunt.registerTask('test', [ 'jasmine' ]);

  grunt.mergeConfig({
    jasmine: {
      'PLURALS': {
        src: 'dist/standalone/Smart.Plurals.all.js'
        , options: {
          specs: [
            'test/Smart/**/*.js'
          ]
        }
      }
    }
  });
};
