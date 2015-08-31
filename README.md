# Chronocube
Simple app to time your Rubik's Cube solves.

![icon](https://raw.githubusercontent.com/pablopunk/chronocube/master/img/icon200px.png)

This app is cross-platform as it's created with *HTML+CSS+JS* and it's packaged on *[Electron](https://github.com/atom/electron)*, a tool to create apps from webapps, so you can use it as a native app on your desktop.

- Try it online [here](http://chronocube.pablopunk.com)

## Download
- [Download for OS X](https://raw.githubusercontent.com/pablopunk/chronocube/master/dist/osx/Chronocube.dmg)
- [Download for Windows](https://raw.githubusercontent.com/pablopunk/chronocube/master/dist/win/Chronocube-Setup.exe)
- Linux: check Build instructions below

## Build
Use the *MAKEFILE* to build the executable for all platforms (you'll need *[electron-packager](https://github.com/maxogden/electron-packager)*):
- `make all` creates all builds (osx, win and linux for all architectures) inside `dist/` and creates both osx and win installers
- `make osx` creates the .dmg installer for darwin x64 in `dist/osx`
- `make win32` creates the .exe installer for win ia32 in `dist/win`
- `make linux` creates the build folder inside `dist/` for both ia32 and x64
- `make linux32` creates the build folder inside `dist/` for ia32
- `make linux64` creates the build folder inside `dist/` for x64

## License
Use it as you wish (but give me credit cause I want to be famous)
Also credits to:
- [Randome state scrambles](https://github.com/cubing/jsss)
- [Background gradients](http://uigradients.com)

## To do
- Implement inspection timer
- Classify solves
