SHELL := /bin/bash

all:
	make osx && make win && make linux

osx:
	rm -rf dist/osx
	cd src && electron-packager . Chronocube --platform darwin --arch=all --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=src/node_modules && cd ..
	cp resources/darwin/app.icns build/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns
	cd src && electron-builder ../build/Chronocube-darwin-x64/Chronocube.app --platform=osx --out=../dist/osx --config=config.json && cd ../dist/osx/ && mv Chronocube.dmg Chronocube-Mac.dmg

win:
	rm -rf dist/win
	cd src && electron-packager . Chronocube --platform win32 --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=src/node_modules && cd ..
	cd src && electron-builder ../build/Chronocube-win32-ia32 --platform=win --out=../dist/win --config=config.json && cd ../dist/win/ && mv "Chronocube Setup.exe" Chronocube-Windows-Installer.exe
	cd build && zip -r ../dist/win/Chronocube-Windows-Portable.zip Chronocube-win32-ia32

linux:
		make linux32 && make linux64

linux32:
		cd src && electron-packager . Chronocube --platform linux --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=src/node_modules
		cd build && zip -r ../dist/Chronocube-Linux32.zip Chronocube-linux-ia32

linux64:
		cd src && electron-packager . Chronocube --platform linux --arch=x64 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=src/node_modules
		cd build && zip -r ../dist/Chronocube-Linux64.zip Chronocube-linux-x64
