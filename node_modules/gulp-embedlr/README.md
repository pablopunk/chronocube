# gulp-embedlr [![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Plugin for embedding a livereload snippet in html files for [gulp](https://github.com/wearefractal/gulp)

## Usage

First, install `gulp-embedlr` as a development dependency:

```shell
npm install --save-dev gulp-embedlr
```

Then, add it to your `gulpfile.js`:

```javascript
var embedlr = require("gulp-embedlr");

gulp.src("./src/*.html")
	.pipe(embedlr())
	.pipe(gulp.dest("./dist"));
```

## API

### embedlr(options)

#### options.port
Type: `String|Number`

Default: `35729`

Port where the script is loaded.

#### options.src
Type: `String`

Default: `"' + (location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':" + port + "/livereload.js?snipver=1";`

The source of the livereload script provided (not by gulp-embedlr). Normally you would not need to change this, only when serving livereload with a proxy for instance.

## Usage

This modifies the original html-file by embedding the livereload-snippet, therefore you should not pipe it back into the same directory where you keep the original files.

Alone, this plugin does not really do much interesting stuff, but combined with [gulp-livereload](https://github.com/vohof/gulp-livereload) and a static server you get a neat workflow.

This plugin is meant as an alternative to the [connect-livereload](https://github.com/intesso/connect-livereload) middleware or a browser plugin. For example with a simpler static server like [ecstatic](https://github.com/jesusabdullah/node-ecstatic) or simply `python -m SimpleHTTPServer`.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-embedlr
[npm-image]: https://badge.fury.io/js/gulp-embedlr.png

[travis-url]: http://travis-ci.org/mollerse/gulp-embedlr
[travis-image]: https://secure.travis-ci.org/mollerse/gulp-embedlr.png?branch=master

[depstat-url]: https://david-dm.org/mollerse/gulp-embedlr
[depstat-image]: https://david-dm.org/mollerse/gulp-embedlr.png
