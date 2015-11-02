'use strict';

var through = require('through2');
var gutil = require('gulp-util');
var mustache = require('mustache');
var fs = require('fs');
var path = require('path');

module.exports = function (view, options, partials) {
    options = options || {};
    partials = partials || {};

    var viewError = null;

    // if view is string, interpret as path to json filename
    if (typeof view === 'string') {
        try {
            view = JSON.parse(fs.readFileSync(view, 'utf8'));
        } catch (e) {
            viewError = e;
        }
    }

    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            this.push(file);
            return cb();
        }

        if (file.isStream()) {
            this.emit(
                'error',
                new gutil.PluginError('gulp-mustache', 'Streaming not supported')
            );
        }

        if (viewError) {
            this.emit(
                'error',
                new gutil.PluginError('gulp-mustache', viewError.toString())
            );
        }

        var template = file.contents.toString();
        try {
            loadPartials(template, file.path);
        } catch (e) {
            this.emit(
                'error',
                new gutil.PluginError('gulp-mustache', e.message)
            );
        }

        file.contents = new Buffer(mustache.render(template, file.data || view, partials));
        if (typeof options.extension === 'string') {
            file.path = gutil.replaceExtension(file.path, options.extension);
        }
        this.push(file);
        cb();
    });

    // find and load partials not already in partials list from disk, recursively
    function loadPartials(template, templatePath) {
        var templateDir = path.dirname(templatePath);

        var partialRegexp = /{{>\s*(\S+)\s*}}/g;

        var partialMatch;
        while (partialMatch = partialRegexp.exec(template)) {
            var partialName = partialMatch[1];

            if (!partials[partialName])
            {
                try
                {
                    var partialPath = path.resolve(templateDir, partialName + '.mustache');
                    var partial = fs.readFileSync(partialPath, 'utf8');
                    partials[partialName] = partial;
                    loadPartials(partial, partialPath);
                }
                catch (ex)
                {
                    gutil.log("Unable to load partial file: " + partialPath);
                }
            }
        }
    }
};
