import { levelConfig } from "./level-config.js";
import { Winston } from "./winston.js";

export class Logger {
	static #instance = null;
	
	#winston;

	constructor(packageName) {
		this.#winston = new Winston(packageName);

		// dynamically create static methods for each log level
		for (const l in levelConfig.levels) {
			Logger[l] = (...args) => this.log(l, ...args);
		}

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

	request(method, path, obj, requestId, correlationId) {
		let message = `Express - ${method} ${path}`;
		if (correlationId) {
			message += ` ; Correlation ${correlationId}`;
		}
		if (requestId) {
			message += ` ; Request ${requestId}`;
		}
		if (obj) {
			message += ` ; ${method === "GET" ? "query" : "body"}: %O`;
		}
		this.#winston.verbose(message, obj);
	}
}
