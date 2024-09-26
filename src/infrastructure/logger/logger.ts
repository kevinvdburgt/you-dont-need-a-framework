import { createLogger, format, transports } from 'winston';
import { match } from 'ts-pattern';
import { config } from '../config/config.js';

const winston = createLogger({
  transports: match(config.NODE_ENV)
    .with('development', () => {
      return new transports.Console({
        level: 'silly',
        format: format.combine(format.colorize(), format.padLevels(), format.simple()),
      });
    })
    .with('production', () => {
      return new transports.Console({
        level: 'silly',
        format: format.combine(format.timestamp(), format.json()),
      });
    })
    .exhaustive(),
});

export const logger = {
  debug: (message: string, context?: object) => void winston.debug(message, context),
  info: (message: string, context?: object) => void winston.info(message, context),
  warning: (message: string, context?: object) => void winston.warn(message, context),
  error: (message: string, context?: object) => void winston.error(message, context),
};
