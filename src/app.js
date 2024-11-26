const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });
const { monitorFilesystem } = require('./services/fileSystemMonitor');
const { sendEmail } = require('./services/emailService');
const EmailTemplate = require('./utils/emailTemplate');
const { log } = require('./utils/logger');
const config = require('./config/config');
const os = require('os');

const main = async () => {
  log(`Starting filesystem monitoring with a threshold of ${config.THRESHOLD}%...`);
  const alerts = await monitorFilesystem();

  if (alerts.length > 0) {
    const hostname = os.hostname();
    const subject = `🚨 Filesystem Space Alert: ${hostname} | Threshold: ${config.THRESHOLD}%`;
    const htmlBody = EmailTemplate.createEmailBody(alerts, config.THRESHOLD);

    await sendEmail(subject, htmlBody);
  } else {
    log(`Everything is fine. The usage threshold of ${config.THRESHOLD}% has not been reached.`);
  }
};

main();
