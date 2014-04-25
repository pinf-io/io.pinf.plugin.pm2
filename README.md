
Status
------

Unreliable. Sometimes hangs when starting/stopping process. Re-evaluate in future. Using `mon` with wrapper as first choice.

Need
----

  * https://github.com/Unitech/pm2/issues/350

Want
----

  * https://github.com/Unitech/pm2/issues/325

Usage
-----

`run.sh`

	config='
	[{
	    "name"       : "'$PIO_SERVICE_ID'",
	    "script"     : "'$PIO_SERVICE_PATH'/install/server.js",
	    "instances"  : "1",
	    "error_file" : "'$PIO_SERVICE_LOG_BASE_PATH'.error.log",
	    "out_file"   : "'$PIO_SERVICE_LOG_BASE_PATH'.out.log",
	    "pid_file"   : "'$PIO_SERVICE_RUN_BASE_PATH'.pid",
	    "exec_mode"  : "fork_mode",
	    "port"       : '$PORT'
	}]'

	echo "$config"

	# TODO: If config changes we must stop and delete job and then start again.

	ID=$(pm2-id-for-name "$PIO_SERVICE_ID")
	if [ $? -ne 0 ]; then
	    echo "$config" | pm2 start -
	else
	    pm2 restart "$ID"
	fi

