#!/bin/bash -e

echo "[pio:return-ok-after-timeout][5000]"

ID=$(./pm2-id-for-name "Pm2Http9615")
if [ $? -ne 0 ]; then
	node_modules/.bin/pm2 web
else
	node_modules/.bin/pm2 list
fi
