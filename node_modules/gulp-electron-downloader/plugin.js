
var gutil = require('gulp-util'),
    PluginError = gutil.PluginError,
    async = require('async'),
    request = require('request'),
    jetpack = require('fs-jetpack'),
    path = require('path'),
    ProgressBar = require('progress'),
    extract = require('extract-zip');

var PLUGIN_NAME = 'gulp-electron-downloader',
    GITHUB_API_URL = 'https://api.github.com/repos/atom/electron/releases';

function optionDefaults (options, callback) {

    options.private = {};

    // setup the platform
    options.platform = options.platform || process.platform;

    // setup the arch
    options.arch = options.arch || process.arch;

    /* ******
        check we're on the right platform, before we go any further
    ****** */

    if (['darwin','linux','win32'].indexOf(options.platform) < 0) {
        return cb(new Error('Only darwin, linux or win32 platforms are supported'));
    }

    if (options.platform === 'darwin' && options.arch !== 'x64') {
        return cb(new Error('Only the x64 architecture is supported on the darwin platform.'));
    }

    if (['x64','ia32'].indexOf(options.arch) < 0) {
        return cb(new Error('Only the x64 and ia32 architectures are supported on the ' + process.platform + ' platform.'));
    }

    /* ******
        okay, let's continue
    ****** */

    // setup the cache directory
    options.cacheDir = options.cacheDir || './electron/cache';

    // setup the build dir
    options.outputDir = options.outputDir || './electron/binaries';

    if (options.version) {
        gutil.log('Verifying requested version (' + options.version + ')');
    } else {
        gutil.log('Retrieving latest release');
    }

    // download the releases information to retrieve the download URL
    request.get({
        url: GITHUB_API_URL,
        headers: {
            'User-Agent': 'gulp-electron-downloader'
        },
        json: true
    }, function (error, response, releases) {

        if (error) {
            return callback(error);
        }

        if (response.statusCode !== 200) {
            return callback(new Error('Failed to retrieve information from the GitHub API.'));
        }

        var bVersion = false,
            bRelease = false;

        if (!options.version) {
            options.version = releases[0].tag_name
            gutil.log('Found', options.version);
        }

        options.private = {};
        options.private.filename = 'electron-' + options.version + '-' + options.platform + '-' + options.arch + '.zip';
        options.private.filePath = path.resolve(path.join(options.cacheDir, options.private.filename));

        // loop through each release and find the correct one
        releases.forEach(function (release) {

            if (release.tag_name === options.version) {

                bVersion = true;

                // loop through each of the assets to find the correct one
                release.assets.forEach(function (asset) {

                    if (asset.name === options.private.filename) {

                        bRelease = true;
                        options.private.downloadUrl = asset.browser_download_url;

                        if (options.downloadMirror && typeof options.downloadMirror === "function") {
                            options.private.downloadUrl = options.downloadMirror(options.private.downloadUrl);
                        }

                    }

                });

            }

        });

        if (!bVersion) {
            return callback(new Error('The specified version could not be found.'));
        }

        if (!bRelease) {
            return callback(new Error('The ' + options.private.filename + ' release could not be found.'));
        }

        return callback(null, options);

    });

}

module.exports = function (options, callback) {

    // accept only one argument, as the callback
    if (arguments.length === 1) {
        callback = options;
        options = undefined;
    }

    options = options || {};

    async.series([

        // setup the default options
        function (cb) {

            optionDefaults(options, function (err, opts) {

                if (err) {
                    return cb(err);
                }

                options = opts;

                return cb(null);

            });

        },

        // make sure the cache directory exists first
        function (cb) {

            jetpack.dirAsync(options.cacheDir)
            .then(function () {
                return cb(null);
            });

        },

        // check the cache
        function (cb) {

            jetpack.existsAsync(options.private.filePath)
            .then(function (exists) {
                options.private.fileExistsInCache = (exists !== false)
                return cb(null);
            });

        },

        // let's actually download the file
        function (cb) {

            if (options.private.fileExistsInCache) {
                gutil.log('This version already exists in cache...');
                return cb(null);
            }

            if (options.downloadMirror) {
                gutil.log('Using requested download mirror: ' + options.private.downloadUrl);
            }

            var progressBar,
                len,
                writableStream = jetpack.createWriteStream(options.private.filePath);

            // make the request to download the file
            request({
                method: 'GET',
                url: options.private.downloadUrl,
                headers: {
                    'User-Agent': 'gulp-electron-downloader'
                },
            })
            // once we have a response, setup the progress bar
            .on('response', function (res) {

                if (res.statusCode !== 200) {
                    return cb(new Error('Could not find electron release ' + options.private.filename));
                }

                gutil.log('Creating file at ' + options.private.filePath + ' ...');

                len = parseInt(res.headers['content-length'], 10);
                progressBar = new ProgressBar('  Downloading [:bar] :percent :etas', {
                    complete: '=',
                    incomplete: ' ',
                    width: 30,
                    total: len
                });

            })
            .on('error', function (err) {
                return cb(err);
            })
            .on('data', function (chunk) {
                if (!progressBar) {
                    return;
                }
                progressBar.tick(chunk.length);
            })
            .on('end', function () {
                writableStream.end(function () {
                    return cb(null);
                });
            })
            .pipe(writableStream);

        },

        function (cb) {

            if (options.outputDir === './electron/binaries') {
              options.private.outputDir = path.resolve(path.join(options.outputDir, options.platform + '-' + options.arch));
            } else {
              options.private.outputDir = path.resolve(options.outputDir);
            }

            // make sure the output directory exists first
            jetpack.dirAsync(options.private.outputDir, {
                empty: true
            })
            .then(function () {

                gutil.log('Unzipping to ', options.private.outputDir);

                extract(options.private.filePath, {
                    dir: options.private.outputDir
                }, function (extractErr) {

                    if (extractErr) {
                        return cb(extractErr);
                    }

                    return cb(null);

                });

            });

        },

    ], function (err) {

        if (err) {
            return callback(new PluginError(PLUGIN_NAME, err.message));
        }

        return callback(null);

    });

};
