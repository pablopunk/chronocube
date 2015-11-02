var through = require("through2");
var es = require("event-stream");
var path = require("path");

var embedlr = function (param) {
  "use strict";

  var opts = param || {};
  var port = opts.port || 35729;
  var src = opts.src || "' + (location.protocol || 'http:') + '//' + (location.hostname || 'localhost') + ':" + port + "/livereload.js?snipver=1";
  var snippet = "\n<script type=\"text/javascript\">document.write('<script src=\"" + src + "\" type=\"text/javascript\"><\\/script>')</script>\n";



  var stream = through.obj(function (file, enc, callback) {
    var checkAndInsert = function(buffer) {
      return new Buffer(buffer.toString(enc).replace(/<\/body>/, function (w) {
        return snippet + w;
      }));
    };

    if(file.isNull() || path.extname(file.path) !== '.html') {
      //Passthrough if not file or not html-file
      this.push(file);
      return callback();
    }

    if (file.contents instanceof Buffer) {

      file.contents = checkAndInsert(file.contents);

      this.push(file);
      return callback();

    } else {
      file.contents = file.contents.pipe(es.split("\n")).pipe(through(function(line, enc, callback) {

        line = checkAndInsert(line);

        this.push(line);
        callback();

      })).pipe(es.join("\n"));

      this.push(file);
      return callback();
    }
  });

  return stream;
};

module.exports = embedlr;