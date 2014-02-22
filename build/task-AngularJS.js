module.exports = function(grunt) {

  grunt.registerTask('AngularJS', [ 'concat:ANGULARJS' ]);

  grunt.mergeConfig({
    concat: {
      'ANGULARJS': {
        options: {
          process: true
        }
        , files: [
          { src: [ 'src/exports/AngularJS/AngularJS.Smart.Plurals.all.js.template' ], dest: 'dist/AngularJS/AngularJS.Smart.Plurals.all.js' }
        ]
      }
    }
  });
};
