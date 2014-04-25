#!/bin/bash -e

if [ ! -f /etc/init.d/pm2-init.sh ]; then
	echo "[pio:return-ok-after-timeout][5000]"
	sudo env PATH=$PATH node_modules/.bin/pm2 startup ubuntu -u root
fi
