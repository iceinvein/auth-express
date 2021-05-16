const winston = require('winston');
const config = require('../config');

const transports = [];
let { logLevel } = config;
if (config.nodeEnv === 'development') {
  transports.push(
    new winston.transports.Console(),
  );
  logLevel = 'debug';
} else {
  transports.push(
    new winston.transports.Console(),
  );
  transports.push(
    new winston.transports.File(
      {
        filename: config.errorLogFile,
        level: 'error',
      },
    ),
  );
  transports.push(
    new winston.transports.File(
      {
        filename: config.logFile,
        level: 'info',
      },
    ),
  );
}

const LoggerInstance = winston.createLogger({
  level: logLevel,
  levels: winston.config.npm.levels,
  format: winston.format.combine(
    winston.format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    winston.format.errors({ stack: true }),
    winston.format.colorize({ all: true }),
    winston.format.simple(),
  ),
  transports,
});

module.exports = LoggerInstance;
