all:
	electron-packager . Chronocube --platform all --arch=all --version=0.30.1 --icon=img/icon.png --out=dist --overwrite && cp img/osx.icns dist/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns

osx:
	rm -rf dist/Chronocube.app && electron-packager . Chronocube --platform darwin --arch=all --version=0.30.1 --icon=img/icon.png --out=dist --overwrite && cp img/osx.icns dist/Chronocube-darwin-x64/Chronocube.app/Contents/Resources/atom.icns && mv dist/Chronocube-darwin-x64/Chronocube.app dist/Chronocube.app && rm -rf dist/Chronocube-darwin-x64 && rm -f dist/Chronocube.dmg && electron-builder dist/Chronocube.app --platform=osx --out=dist/ --config=config.json && rm -rf dist/Chronocube.app
