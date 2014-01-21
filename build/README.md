Grunt tasks:

`grunt` - builds the combined & minified files, runs jshint, runs unit tests
`grunt watch` - same as default, and watches for changes

`grunt bump` - increment the version number. Increments `:patch`, but you can also use `:minor` or `:major`.
`grunt release` - builds to the /releases folder
`grunt publish` - tags the current release version, pushes to GitHub, and publishes to NPM.
