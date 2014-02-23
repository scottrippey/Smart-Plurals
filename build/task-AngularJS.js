module.exports = function(grunt) {

  grunt.registerTask('AngularJS', [ 'concat:ANGULARJS', 'uglify:ANGULARJS-MIN' ]);

  grunt.mergeConfig({
    concat: {
      'ANGULARJS': {
        options: {
          process: true
        }
        , files: [
          { dest: 'dist/AngularJS/AngularJS.Smart.Plurals.all.js', src: [ 'src/exports/AngularJS/AngularJS.Smart.Plurals.all.js.template' ] }
        ]
      }
    }
    , uglify: {
      'ANGULARJS-MIN': {
        files: [
          { dest: 'dist/AngularJS/AngularJS.Smart.Plurals.all.min.js', src: 'dist/AngularJS/AngularJS.Smart.Plurals.all.js' }
        ]
      }
    }
  });
};
