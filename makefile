SHELL := /bin/bash

all: osx win linux

osx:
	rm -rf dist/Chronocube-Mac.dmg
	cd src && electron-packager . Chronocube --electron-version=2.0.8 --platform darwin --arch=all --app-version=0.5.1 --out=../build --overwrite --ignore=node_modules && cd ..
	cp resources/darwin/app.icns build/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns
	cd src && electron-builder ../build/Chronocube-darwin-x64/Chronocube.app --platform=mac --config=config.json && cd ../dist/ && mv Chronocube.dmg Chronocube-Mac.dmg

win:
	rm -rf dist/Chronocube-Windows-Portable.zip
	cd src && electron-packager . Chronocube --electron-version=2.0.8 --platform win32 --arch=ia32 --app-version=0.5.1 --out=../build --overwrite --ignore=node_modules && cd ..
	cd src && electron-builder ../build/Chronocube-win32-ia32 --platform=win --config=config.json && cd ../dist/ && mv "Chronocube Setup.exe" Chronocube-Windows-Installer.exe
	cd build && zip -r ../dist/Chronocube-Windows-Portable.zip Chronocube-win32-ia32

linux: linux32 linux64

linux32:
		cd src && electron-packager . Chronocube --electron-version=2.0.8 --platform linux --arch=ia32 --app-version=0.5.1 --out=../build --overwrite --ignore=node_modules
		cd build && zip -r ../dist/Chronocube-Linux32.zip Chronocube-linux-ia32

linux64:
		cd src && electron-packager . Chronocube --electron-version=2.0.8 --platform linux --arch=x64 --app-version=0.5.1 --out=../build --overwrite --ignore=node_modules
		cd build && zip -r ../dist/Chronocube-Linux64.zip Chronocube-linux-x64
