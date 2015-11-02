# string-editor

Edit a string using $EDITOR from within your node app.

	npm install string-editor

## Usage

``` js
var edit = require('string-editor');

// this launches your $EDITOR with a tmp file containing "hello world"
edit('hello world', function(err, result) {
	// when you are done editing result will contain the string
	console.log(result);
});
```

Sometimes it can be useful to set an filename to help your editor to enable highlighting etc.

``` js
// we pass app.js as a filename to help with highlighting
edit('var a = 42;', 'app.js', function(err, result) {
	console.log(result);
})
```

Note that `app.js` will still be a tmp file

## License

MIT