Grunt tasks:

`grunt` - builds the combined & minified files, runs jshint, runs unit tests

`grunt watch` - same as default, and watches for changes


`grunt bump` - increment the version number. Increments `:patch`, but you can also use `:minor` or `:major`.

`grunt release` - copies to the /releases/v#.#.# folder

`grunt tag` - Creates a git tag with the current version

To update NPM, run `npm publish`

To update Bower, run `git push origin --tags`

