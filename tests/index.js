import { Logger } from "../src/logger.js";

Logger.create("@owlebot/logger");

Logger.debug("main", "log to debug something");
Logger.info("main", "all good");
Logger.error("main", "critical error");
