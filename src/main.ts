import { config } from './infrastructure/config/config.js';
import { logger } from './infrastructure/logger/logger.js';
import { mathModule } from './modules/math/math.js';

mathModule();

logger.info(`You dont need a Framework running in ${config.NODE_ENV} mode.`);
