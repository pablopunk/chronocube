SHELL := /bin/bash

all: osx win linux

osx:
	rm -rf dist/Chronocube-Mac.dmg
	cd src && electron-packager . Chronocube --platform darwin --arch=all --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules && cd ..
	cp resources/darwin/app.icns build/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns
	cd src && electron-builder ../build/Chronocube-darwin-x64/Chronocube.app --platform=osx --out=../dist/ --config=config.json && cd ../dist/ && mv Chronocube.dmg Chronocube-Mac.dmg

win:
	rm -rf dist/Chronocube-Windows-Portable.zip
	cd src && electron-packager . Chronocube --platform win32 --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules && cd ..
	cd src && electron-builder ../build/Chronocube-win32-ia32 --platform=win --out=../dist/ --config=config.json && cd ../dist/ && mv "Chronocube Setup.exe" Chronocube-Windows-Installer.exe
	cd build && zip -r ../dist/Chronocube-Windows-Portable.zip Chronocube-win32-ia32

linux:
		make linux32 && make linux64

linux32:
		cd src && electron-packager . Chronocube --platform linux --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules
		cd build && zip -r ../dist/Chronocube-Linux32.zip Chronocube-linux-ia32

linux64:
		cd src && electron-packager . Chronocube --platform linux --arch=x64 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules
		cd build && zip -r ../dist/Chronocube-Linux64.zip Chronocube-linux-x64
