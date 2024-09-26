import { config } from './infrastructure/config/config.js';
import { logger } from './infrastructure/logger/logger.js';

logger.info(`You dont need a Framework running in ${config.NODE_ENV} mode.`);
