import { Logger } from "../src/Logger.js";

Logger.create("@owlebot/logger", "debug");

Logger.debug("main", "log to debug something");
Logger.info("main", "all good");
Logger.error("main", "critical error");
