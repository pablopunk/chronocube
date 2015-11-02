var publishRelease = require('publish-release');
var through = require('through2');
var gutil = require('gulp-util');

var PluginError = gutil.PluginError;
var PLUGIN_NAME = 'gulp-github-release';

module.exports = function(options) {
  var files = [];

  var stream = through.obj(function(file, encoding, next) {
    files.push(file.path);
    next();
  }, function(callback) {
    var _this = this;
    var manifest = options.manifest;
    var repo = manifest && manifest.repository && /git@github\.com:([\w-]+)\/([\w-]+)\.git/.exec(manifest.repository.url);

    options = options || {};
    options.token = options.token || process.env.GITHUB_TOKEN;
    options.assets = files;
    options.owner = options.owner || repo && repo[1] || undefined;
    options.repo = options.repo || repo && repo[2] || undefined;
    options.tag = options.tag || manifest && ('v' + manifest.version) || undefined;
    options.name = options.name || options.tag;

    var release = publishRelease(options, callback);

    release.on('created-release', function() {
      gutil.log('Release created successfully at https://github.com/' + options.owner + '/' + options.repo + '/releases/tag/' + options.tag);
    });

    release.on('upload-asset', function(name) {
      gutil.log('Uploading asset ' + name);
    });
  });

  // returning the file stream
  stream.resume();
  return stream;
};
