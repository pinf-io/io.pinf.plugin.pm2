#!/usr/bin/env node

const EXEC = require("child_process").exec;

function main(callback) {

	// TODO: Figure out a way to do this without having to parse the colorized output of `pm2 list`.

	return EXEC("pm2 list", function(err, stdout, stderr) {
		if (err) return callback(err);

		var found = null;
		stdout.split("\n").forEach(function(line) {
			if (found) return;
			line = JSON.parse(JSON.stringify(line).replace(/\\u[^\[]+\[\d+m/g, ""));
			var m = line.match(/^.\s+(\S+)\s+.\s+(\d+)\s+./);
			if (m) {
				if (m[1] === process.argv[2]) {
					found = m[2];
				}
			}
			return;
		});

		if (found) {
			process.stdout.write(found);
			return callback(null);
		}
		return callback("Not found!");
	});

}

if (require.main === module) {
	main(function(err) {
		if (err) {			
			if (err.stack) {
				console.error(err.stack);
			} else {
				console.error(err);
			}
			return process.exit(1);
		}
		return process.exit(0);
	});
}
