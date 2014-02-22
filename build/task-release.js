module.exports = function(grunt) {

  grunt.registerTask('release', [ 'Plurals', 'copy:PLURALS-RELEASE' /*, 'shell:GIT-ADD-RELEASE' */ ]);

  grunt.registerTask('publish', [ 'shell:GIT-TAG', 'shell:GIT-PUSH', 'shell:NPM-PUBLISH' ]);

  grunt.mergeConfig({
    copy: {
      'PLURALS-RELEASE': {
        files: [{ expand: true, src: [ 'dist/**' ], dest: 'releases/v<%= pkg.version %>' }]
      }
    }
    ,
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
