all:
	rm -rf build/darwin64; rm -rf build/win32; rm -rf build/linux32; rm -rf build/linux64
	gulp build:darwin64; gulp build:win32; gulp build:linux32; gulp build:linux64

osx:
	rm -rf build/darwin64
	gulp build:darwin64

win32:
	rm -rf build/win32
	gulp build:win32

linux32:
	rm -rf build/linux32
	gulp build:linux32

linux64:
	rm -rf build/linux64
	gulp build:linux64

pack:
	gulp pack:darwin64 # mac os x
	cd build
	zip -r ../dist/linux32.zip linux32 # linux
	zip -r ../dist/linux64.zip linux64
	zip -r ../dist/win32.zip win32 # windows
