const logger = require('../utils/logger');

module.exports = (req, res, next) => {
  logger.info(`Request received: ${req.method} ${req.url}`);
  res.on('finish', () => {
    logger.info(`Response sent: ${res.statusCode}`);
  });
  next();
};
