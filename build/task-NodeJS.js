module.exports = function(grunt) {

  grunt.registerTask('NodeJS', [ 'concat:NODEJS', 'uglify:NODEJS-MIN' ]);

  grunt.mergeConfig({
    concat: {
      'NODEJS': {
        options: {
          process: true
        }
        , files: [
          { dest: 'dist/NodeJS/NodeJS.Smart.Plurals.all.js', src: [ 'src/exports/NodeJS/NodeJS.Smart.Plurals.all.js.template' ] }
        ]
      }
    }
    ,
    uglify: {
      'NODEJS-MIN': {
        files: [
          { dest: 'dist/NodeJS/NodeJS.Smart.Plurals.all.min.js', src: 'dist/NodeJS/NodeJS.Smart.Plurals.all.js' }
        ]
      }
    }
  });
};
