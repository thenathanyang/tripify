const winston = require("winston");
const config = require("../config");

module.exports = winston.createLogger({
  level: config.logLevel,
  format: winston.format.combine(
    winston.format.cli(),
    winston.format.colorize()
  ),
  transports: [
    new winston.transports.Console(),
  ],
});
