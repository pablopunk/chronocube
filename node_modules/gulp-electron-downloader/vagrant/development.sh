#!/usr/bin/env bash

if [ ! -e /etc/vagrant/development ]
then

	echo ">>> setting up the development tools"

	# install gulp
	npm install -g gulp

	# instal grunt-cli
	npm install -g grunt-cli

	# install bower
	npm install -g bower

	# only run once
    touch /etc/vagrant/development

else

	echo ">>> development tools already development..."

fi
