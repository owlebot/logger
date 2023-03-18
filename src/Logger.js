import { levelConfig } from "./levelConfig.js";
import { Winston } from "./Winston.js";

export class Logger {
	static #instance = null;
	
	#winston;

	constructor(packageName) {
		this.#winston = new Winston(packageName);

		// dynamically create static methods for each log level
		for (const l in levelConfig.levels) {
			Logger[l] = (...args) => this.log(l, ...args);
		}

		Logger.init = (...args) => this.init(...args);
		Logger.request = (...args) => this.request(...args);
	}

	static create(packageName) {
		if (!this.#instance) {
			this.#instance = new Logger(packageName);
		}
	}
	
	log(level, module, log, obj) {
		this.#winston[level](`${module} - ${log}${obj ? " ; %O" : ""}`, obj);
	}

	init(port) {
		this.#winston.notice(`Express - Listening on port ${port}.`);
	}

	request(method, path, obj, requestID, correlationId) {
		let message = `Express - ${method} ${path}`;
		if (correlationId) {
			message += ` ; Correlation ${correlationId}`;
		}
		if (requestID) {
			message += ` ; Request ${requestID}`;
		}
		if (obj) {
			message += ` ; ${method === "GET" ? "query" : "body"}: %O`;
		}
		this.#winston.verbose(message, obj);
	}
}
