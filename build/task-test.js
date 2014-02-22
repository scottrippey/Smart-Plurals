module.exports = function(grunt) {
  grunt.registerTask('test', [ 'jasmine' ]);

  grunt.mergeConfig({
    jasmine: {
      'PLURALS': {
        src: [
          'dist/standalone/Smart.Plurals.all.js'
        ]
        , options: {
          specs: [
            'test/Smart/**/*.js'
          ]
        }
      }
      ,
      'ANGULARJS': {
        src: [
          'bower_components/angular/angular.js'
          , 'bower_components/angular-mocks/angular-mocks.js'

          , 'dist/AngularJS/AngularJS.Smart.Plurals.all.js'
        ]
        , options: {
          specs: [
            'test/exports/AngularJS/**/*.js'
          ]
        }
      }
    }
  });
};
