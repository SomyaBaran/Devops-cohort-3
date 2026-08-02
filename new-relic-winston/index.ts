// require("newrelic");
import winston from "winston";

const logger = winston.createLogger({
  level: "info",
  // format: winston.format.combine(
  //   winston.format.timestamp(),
  //   winston.format.prettyPrint()
  // ),
  // format: winston.format.simple(),
  format: winston.format.json(),
  transports: [
    new winston.transports.File({ filename: "error.log", level: "error" }),
    new winston.transports.File({ filename: "combined.log" }),
    new winston.transports.Console()
  ],
});

logger.error("Hello, world!");
logger.info("Hello, world!");
logger.debug("developer log");
logger.warn("warning log");
logger.error("error log");