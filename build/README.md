Grunt tasks:

## Development

`grunt` - builds the combined & minified files, runs jshint, runs unit tests

`grunt watch` - same as default, and watches for changes

## Publish

`grunt bump` - increment the version number. Increments `:patch`, but you can also use `:minor` or `:major`.

`grunt release` - copies to the `/releases/v#.#.#` folder

Manually commit the `releases` folder to Git.
Push these changes to GitHub.

To update NPM:  
Run `npm publish`  

To update Bower:  
`grunt tag` (adds a Git tag with the current version)  
`git push origin --tags` (Bower automatically sees the latest version)  
