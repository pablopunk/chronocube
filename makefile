SHELL := /bin/bash

all:
	make osx && make win && make linux

osx:
	rm -rf dist/osx
	cd src && electron-packager . Chronocube --platform darwin --arch=all --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules && cd ..
	cp resources/darwin/app.icns build/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns
	cd src && electron-builder ../build/Chronocube-darwin-x64/Chronocube.app --platform=osx --out=../dist/osx --config=config.json && cd ..

win:
	rm -rf dist/win
	cd src && electron-packager . Chronocube --platform win32 --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules && cd ..
	cd src && electron-builder ../build/Chronocube-win32-ia32 --platform=win --out=../dist/win --config=config.json && cd ..
	cd build && zip -r ../dist/win/windows-portable.zip Chronocube-win32-ia32

linux:
		make linux32 && make linux64

linux32:
		cd src && electron-packager . Chronocube --platform linux --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules
		cd build && zip -r ../dist/linux32.zip Chronocube-linux-ia32

linux64:
		cd src && electron-packager . Chronocube --platform linux --arch=x64 --version=0.30.1 --icon=img/icon.png --out=../build --overwrite --ignore=node_modules
		cd build && zip -r ../dist/linux64.zip Chronocube-linux-x64
