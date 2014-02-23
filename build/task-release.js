module.exports = function(grunt) {

  grunt.registerTask('release', [ 'default', 'copy:PLURALS-RELEASE' ]);

  grunt.registerTask('tag', [ 'shell:GIT-TAG', 'shell:ECHO-TAG' ]);

  grunt.mergeConfig({
    copy: {
      'PLURALS-RELEASE': {
        files: [{ expand: true, cwd: 'dist', src: [ '**' ], dest: 'releases/v<%= pkg.version %>' }]
      }
    }
    ,
    shell: {
      options: { stdout: true }
      ,
      'GIT-TAG': {
        command: "git tag -a v<%= pkg.version %> -m \"Release v<%= pkg.version %>\""
      }
      ,
      'ECHO-TAG': {
        command: "ECHO " +
          "                                                                                " +
          "    To push the tags to GitHub and NPM, run the following commands:             " +
          "        git push origin --tags                                                  " +
          "        npm publish                                                             "
      }
    }
  });

};
