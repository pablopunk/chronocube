# Chronocube

*Simple app to time your Rubik's Cube solves.*

***

[![Join the chat at https://gitter.im/pablopunk/chronocube](https://badges.gitter.im/pablopunk/chronocube.svg)](https://gitter.im/pablopunk/chronocube?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://raw.githubusercontent.com/pablopunk/chronocube/master/LICENSE)

Request new features! [Open an issue](https://github.com/pablopunk/chronocube/issues) or [join the chat](https://gitter.im/pablopunk/chronocube?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge).

Are you a developer or a designer? Fork it and [make a pull request](https://github.com/pablopunk/chronocube/pulls)! You can check the To Do list at the end of this file.

Or simply [show me some love](https://twitter.com/pablopunk) ;)

---

This app is cross-platform as it's created with *HTML+CSS+JS* and it's packaged on *[Electron](https://github.com/atom/electron)*, a tool to create apps from webapps, so you can use it as a native app on your desktop.

![screenshot](http://f.cl.ly/items/1T2L0b1R0O3M0k3Z0P45/screenshot-black.png)

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

## To do
- Hotfixes:
  - Download file on exporting (instead of opening new window)
- csTimer import/export
- Google Drive integration (sync across devices)
- Refactor javascript. It works but the classes and methods are a little bit messy. **Would be nice to make a real/clear MVC** with more consistent roles.
