import winston, {
	createLogger,
	format,
	transports,
} from "winston";

import { levelConfig } from "./level-config.js";

function _padLevel(level) {
	return level.toUpperCase().padEnd(7, " ");
}

export class Winston {
	constructor(packageName) {
		this.createTransport();

		winston.addColors(levelConfig.colors);

		return createLogger( {
			levels: levelConfig.levels,
			transports: [
				this.consoleTransport,
				// this.fatalTransport,
				// this.errorTransport,
				// this.infoTransport,
				// this.globalTransport,
			],
			format: format.combine(
				format.errors( { stack: true } ),
				format.json(),
				format.splat(),
				format.label( { label: packageName } ),
				format.timestamp( {
					format: "YYYY-MM-DD HH:mm:ss",
				} ),
				format.printf(this.format),
			),
			exitOnError: false,
			exceptionHandlers: [this.consoleTransport/* , this.fatalTransport*/],
		} );
	}

	format( { level, message, label, timestamp } ) {
		return `${timestamp} - [ ${label} ] ${_padLevel(level)} | ${message}`;
	}

	createTransport() {
		this.consoleTransport = new transports.Console( {
			level: "debug",
			format: format.combine(
				format.colorize( { all: true } ),
			),
		} );
        
		// this.fatalTransport = new transports.File( {
		// 	filename: "fatal.winston.log",
		// 	level: "fatal",
		// } );
        
		// this.errorTransport = new transports.File( {
		// 	filename: "error.winston.log",
		// 	level: "error",
            
		// } );
        
		// this.infoTransport = new transports.File( {
		// 	filename: "info.winston.log",
		// 	level: "info",
		// } );

		// this.globalTransport = new transports.File( {
		// 	filename: "global.winston.log",
		// 	level: "verbose",
		// } );
	}
}
