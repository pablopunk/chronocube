# Chronocube
Simple app to time your Rubik's Cube solves.

![icon](https://raw.githubusercontent.com/pablopunk/chronocube/master/src/img/icon200px.png)

This app is cross-platform as it's created with *HTML+CSS+JS* and it's packaged on *[Electron](https://github.com/atom/electron)*, a tool to create apps from webapps, so you can use it as a native app on your desktop.

![screnshot](https://s3.amazonaws.com/f.cl.ly/items/360K0M2o1M2i0X32212d/Captura%20de%20pantalla%202015-12-14%20a%20las%207.28.36.png?v=b8fd4955)

- Try it online [here](http://chronocube.pablopunk.com)

## Download
- Check the [releases page](https://github.com/pablopunk/chronocube/releases)

## Build
I use [this tool](https://github.com/Aluxian/electron-superkit) for both building and packaging the app for all platforms, so be sure to check out the repo for more details.

Use the *MAKEFILE* to build the executable for all platforms:
- `make all` creates all builds (osx, win and linux for all architectures) inside `build/`
- `make osx` creates the .app for darwin x64 in `build/darwin64`
- `make win32` creates the .exe for win ia32 in `build/win32`
- `make linux32` creates the installation folders for linux ia32 inside `build/linux32` for ia32
- `make linux64` creates the installation folders for linux x64 inside `build/linux64`

## Packages
You can check the installers in `dist`. In order to make your own, use [the documentation of the packager](https://github.com/Aluxian/electron-superkit/wiki/Packaging) (code-signing and packaging sections)

## License
Check `LICENSE.md` (MIT License)

Also credits to:
- [Electron SuperKit](https://github.com/Aluxian/electron-superkit)
- [Random state scrambles](https://github.com/cubing/jsss)
- [Background gradients](http://uigradients.com)]

## To do
- Implement inspection timer

#### Don't be afraid to send pull requests :)
