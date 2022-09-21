import { format } from "node:util";

const LOG_LEVELS = {
	debug: 0,
	info: 1,
	warn: 2,
	error: 3,
};

/**
 * Singleton Logger
 * LOG_LEVELS:
 * - debug
 * - info
 * - warn
 * - error
 *
 * @class Logger
 */
class Logger {
	#package;

	#level;

	static #instance = null;

	constructor(packageName, level) {
		this.#package = packageName;
		this.#level = LOG_LEVELS[level];

		// dynamically create static methods for each log level
		for (const l in LOG_LEVELS) {
			Logger[l] = (module, log) => this.log(l, module, log);
		}
	}

	static create(packageName, level = "INFO") {
		if (!this.#instance) {
			this.#instance = new Logger(packageName, level);
		}
	}

	_shouldLog(level) {
		return LOG_LEVELS[level] >= this.#level;
	}
	
	log(level, module, log) {
		if (this._shouldLog(level) ) {
			console.log(this._format(level, module, log) );
		}
	}

	_format(level, module, log) {
		const time = this._parseTime();
		return `${time} - [ ${this.#package} ] ${this._parseLevel(level)} | ${module} - ${log}`;
	}

	_parseLevel(level) {
		return level.toUpperCase().padEnd(5, " ");
	}

	_parseTime() {
		const current = new Date();
		const formatted = format("[ %s ]", `${this._parseTimeElement(current.getHours() )}:${this._parseTimeElement(current.getMinutes() )}:${this._parseTimeElement(current.getSeconds() )}`);
		return formatted;
	}

	_parseTimeElement(timeElement) {
		return String(timeElement).padStart(2, 0);
	}
}

export default Logger;
