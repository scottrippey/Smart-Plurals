module.exports = function(grunt) {

  grunt.registerTask('release', [ 'Plurals', 'concat:PLURALS-RELEASE', 'shell:GIT-ADD-RELEASE' ]);

  grunt.registerTask('publish', [ 'shell:GIT-TAG', 'shell:GIT-PUSH', 'shell:NPM-PUBLISH' ]);

  grunt.mergeConfig({
    shell: {
      options: { stdout: true }
      ,
      'GIT-ADD-RELEASE': {
        command: "git add releases/v<%= pkg.version %>"
      }
      ,
      'GIT-TAG': {
        command: "git tag -a v<%= pkg.version %> -m 'Release v<%= pkg.version %>' "
      }
      ,
      'GIT-PUSH': {
        command: "git push origin --tags"
      }
      ,
      'NPM-PUBLISH': {
        command: "npm publish"
      }
    }
  });

};
