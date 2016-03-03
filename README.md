# Chronocube

*Simple app to time your Rubik's Cube solves.*

***

[![Join the chat at https://gitter.im/pablopunk/chronocube](https://badges.gitter.im/pablopunk/chronocube.svg)](https://gitter.im/pablopunk/chronocube?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)
[![License](http://img.shields.io/:license-mit-blue.svg)](https://raw.githubusercontent.com/pablopunk/chronocube/master/LICENSE)

Request new features! [Open an issue](https://github.com/pablopunk/chronocube/issues) or [join the chat](https://gitter.im/pablopunk/chronocube?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge).

Are you a developer or a designer? Fork it and [make a pull request](https://github.com/pablopunk/chronocube/pulls)!

Or simply [show me some love](https://twitter.com/pablopunk) ;)

---

This app is cross-platform as it's created with *HTML+CSS+JS* and it's packaged on *[Electron](https://github.com/atom/electron)*, a tool to create apps from webapps, so you can use it as a native app on your desktop.

![screnshot](https://s3.amazonaws.com/f.cl.ly/items/360K0M2o1M2i0X32212d/Captura%20de%20pantalla%202015-12-14%20a%20las%207.28.36.png?v=b8fd4955)

## Download
- Try it online [here](http://chronocube.pablopunk.com)
- Check the [releases page](https://github.com/pablopunk/chronocube/releases) for desktop apps


## Build and Package

Make sure you have the dependencies installed (instructions are found in each page, but this is how you do it on OS X):

- [nodejs](https://nodejs.org/en/)
- [electron-builder](https://github.com/maxogden/electron-packager) and [electron-packager](https://github.com/maxogden/electron-packager)

    ```shell
  npm install electron-packager -g
  npm install electron-builder -g
  # windows builds in no windows platforms
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
- [Background gradients](http://uigradients.com)

Older versions included:
- [Electron SuperKit](https://github.com/Aluxian/electron-superkit) for building and packaging

## To do
- Add notes to each time
- Move time to another solve
