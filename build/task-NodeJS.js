module.exports = function(grunt) {

  grunt.registerTask('NodeJS', [ 'concat:NODEJS' ]);

  grunt.mergeConfig({
    concat: {
      'NODEJS': {
        options: {
          process: true
        }
        , files: [
          { src: [ 'src/exports/NodeJS/NodeJS.Smart.Plurals.all.js.template' ], dest: 'dist/NodeJS/NodeJS.Smart.Plurals.all.js' }
        ]
      }
    }
  });
};
