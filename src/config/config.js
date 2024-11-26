const { validateIntegerInRange } = require('../utils/validationUtil');

const config = {
  THRESHOLD: validateIntegerInRange(process.env.THRESHOLD, 1, 100, 75),
  EXCLUDE_LIST: process.env.EXCLUDE_LIST ? new RegExp(process.env.EXCLUDE_LIST) : null, 
  SMTP: {
    HOST: process.env.SMTP_HOST,
    PORT: process.env.SMTP_PORT || 587,
    USER: process.env.SMTP_USER,
    PASS: process.env.SMTP_PASS,
    TO: process.env.MAIL_TO,
  },
};

// Validate email configuration
if (!config.SMTP.HOST || !config.SMTP.USER || !config.SMTP.PASS || !config.SMTP.TO) {
  console.error('Error: Incomplete email configuration. Check environment variables.');
  process.exit(1);
}

module.exports = config;
