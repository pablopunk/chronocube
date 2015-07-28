all:
	electron-packager . Chronocube --platform all --arch=all --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist && rm -rf dist/Chronocube.app && cp img/osx.icns dist/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns && mv dist/Chronocube-darwin-x64/Chronocube.app dist/Chronocube.app && rm -rf dist/Chronocube-darwin-x64 && rm -f dist/Chronocube.dmg && electron-builder dist/Chronocube.app --platform=osx --out=dist/ --config=config.json && rm -rf dist/Chronocube.app

osx:
	rm -rf dist/Chronocube.app && electron-packager . Chronocube --platform darwin --arch=all --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist && cp img/osx.icns dist/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns && mv dist/Chronocube-darwin-x64/Chronocube.app dist/Chronocube.app && rm -rf dist/Chronocube-darwin-x64 && rm -f dist/Chronocube.dmg && electron-builder dist/Chronocube.app --platform=osx --out=dist/ --config=config.json && rm -rf dist/Chronocube.app

win:
	electron-packager . Chronocube --platform win32 --arch=all --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist

win32:
	electron-packager . Chronocube --platform win32 --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist

win64:
	electron-packager . Chronocube --platform win32 --arch=x64 --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist

linux:
	electron-packager . Chronocube --platform linux --arch=all --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist

linux32:
	electron-packager . Chronocube --platform linux --arch=ia32 --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist

linux64:
	electron-packager . Chronocube --platform linux --arch=x64 --version=0.30.1 --icon=img/icon.png --out=dist --overwrite --ignore dist
