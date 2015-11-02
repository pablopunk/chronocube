# gulp-electron-downloader

A gulp.js plugin to download electron. Super simple, it will simply download (and cache) and extract to a directory of your choice. You can run with zero-configuration, and use the defaults. Or configure as you wish.

This plugin makes it really easy to get any electron binary you need, where as most others only download electron for the platform for the host.

If you're wanting to build an electron release, you'll need another plugin for that.

## Installation

Install gulp plugin package:

```sh
npm install --save-dev gulp-electron-downloader
```

## Usage

The most simple is the following:

```js
var gulp = require('gulp');
var electronDownloader = require('gulp-electron-downloader');

gulp.task('download-electron', function(cb){

    electronDownloader(cb);

});

gulp.task('default', ['download-electron']);
```

This will download the latest release of electron, matching the platform and architecture of the host. The `./electron/cache` folder will be used to store downloads, and the final output will end up `./electron/binaries`.

### Constructor

```js
electronDownloader([options], callback)
```

### Options

You can customise what is downloaded with the following:

- `version` - the version of electron you want to download. This defaults to the latest release.
- `platform` - the platform you want to download. Choices are `darwin`, `win32`, `linux`. This defaults to the host platform.
- `arch` - the architecture of the platform you want to download. This defaults to the host architecture.
- `cacheDir` - the location of the caching directory in which downloads will be stored. This defaults to `./electron/cache`.
- `outputDir` - the location of the unzipped binary. This defaults to `./electron/binaries/platform-arch/`.
- `downloadMirror` - a function that provided the official electron download URL for a particular version, returns a URL to a mirror of your choice. An example for China:

```
downloadMirror: function (downloadUrl) {
    return downloadUrl.replace('https://github.com/atom/electron/releases/download/v', 'https://npm.taobao.org/mirrors/electron/');
}
```
