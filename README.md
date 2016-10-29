# Chronocube

*Simple app to time your Rubik's Cube solves.*

***

[![Join the chat at https://gitter.im/pablopunk/chronocube](https://badges.gitter.im/pablopunk/chronocube.svg)](https://gitter.im/pablopunk/chronocube?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://raw.githubusercontent.com/pablopunk/chronocube/master/LICENSE)
---

This app is cross-platform as it's created with *HTML+CSS+JS* and it's packaged on *[Electron](https://github.com/atom/electron)*, a tool to create apps from webapps, so you can use it as a native app on your desktop.

![screenshot](http://f.cl.ly/items/2C1t2m3r3D0H3A392a2t/screenshot-black.png)

## Download
- Try it [online](http://chronocube.pablopunk.com)
- Download [desktop apps](https://github.com/pablopunk/chronocube/releases)


## Build and Package

Make sure you have the dependencies installed (instructions are found in each page, but this is how you do it on OS X):

- [nodejs](https://nodejs.org/en/)
- [electron-builder](https://github.com/maxogden/electron-packager) and [electron-packager](https://github.com/maxogden/electron-packager)

    ```shell
  npm install electron-packager -g
  npm install electron-builder -g
  # windows builds on mac
  brew install wine makensis # asks for XQuartz install
    ```

Use the *MAKEFILE* to build the executable for all platforms:

- `make all`:
  * creates all builds inside `build/`
  * creates apps for mac and win inside `dist/`
- Specific arquitectures:
  * `make osx`
  * `make win`
  * `make linux32`
  * `make linux64`
  * `make linux` (both `ia32` and `x64`)

## Contribution

*NOTE: Right now I'm working on a [refactored](https://github.com/pablopunk/chronocube/commits/react) version of Chronocube, so all the code in the 'master' branch is being written from scratch in [typescript](https://github.com/Microsoft/TypeScript) and [React](https://facebook.github.io/react/). Keep this in mind if you're going to contribute to this project, as it would pointless to add new features to the live version without having the new refactor in mind.*

Request new features! [Open an issue](https://github.com/pablopunk/chronocube/issues) or [join the chat](https://gitter.im/pablopunk/chronocube?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge).

Are you a developer or a designer? Fork it and [make a pull request](https://github.com/pablopunk/chronocube/pulls)!

Or simply [show me some love](https://twitter.com/pablopunk) ;)


## License
Check `LICENSE` (MIT License)

Also credits to:
- [Random state scrambles](https://github.com/cubing/jsss)
- [Ionic icons](http://ionicons.com/)
- [Background gradients](http://uigradients.com)
- [Flat UI Colors](http://flatuicolors.com/)
- [iOS 7 Colors](http://ios7colors.com/)

Older versions included:
- [Electron SuperKit](https://github.com/Aluxian/electron-superkit) for building and packaging

