var editor = require('editor');
var os = require('os');
var fs = require('fs');
var path = require('path');

var edit = function(str, filename, cb) {
	if (typeof filename === 'function') return edit(str, null, filename);
	if (!filename) filename = Date.now()+'';

	filename = path.join(os.tmpDir(), filename);
	fs.writeFile(filename, str, function(err) {
		if (err) return cb(err);
		editor(filename, function(code) {
			if (code) return cb(new Error('non-zero exit code ('+code+')'));
			fs.readFile(filename, 'utf-8', function(err, result) {
				if (err) return cb(err);
				fs.unlink(filename, function() {
					cb(null, result);
				});
			});
		});
	});
};

module.exports = edit;