const rateLimit = require('express-rate-limit');
const { LimiterMessage } = require('../utils/constants');

const rateLimiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 2 minutes
  max: 100, // max 100 requests
  handler: (req, res) => res.status(429).json({
    message: LimiterMessage,
  }),
});

module.exports = {
  rateLimiter,
};
