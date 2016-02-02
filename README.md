# Chronocube
Simple app to time your Rubik's Cube solves.

![icon](https://raw.githubusercontent.com/pablopunk/chronocube/master/src/img/icon200px.png)

This app is cross-platform as it's created with *HTML+CSS+JS* and it's packaged on *[Electron](https://github.com/atom/electron)*, a tool to create apps from webapps, so you can use it as a native app on your desktop.

![screnshot](https://s3.amazonaws.com/f.cl.ly/items/360K0M2o1M2i0X32212d/Captura%20de%20pantalla%202015-12-14%20a%20las%207.28.36.png?v=b8fd4955)

## Download
- Try it online [here](http://chronocube.pablopunk.com)
- Check the [releases page](https://github.com/pablopunk/chronocube/releases) for desktop apps

## Build and Package

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
Check `LICENSE.md` (MIT License)

Also credits to:
- [Random state scrambles](https://github.com/cubing/jsss)
- [Background gradients](http://uigradients.com)

Older versions included:
- [Electron SuperKit](https://github.com/Aluxian/electron-superkit) for building and packaging

## To do
- Implement inspection timer

#### Don't be afraid to send pull requests :)
