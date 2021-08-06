const keys = require('../config/keys');
const sgMail = require('@sendgrid/mail');

module.exports = async ({ subject, recipients }, content) => {
  sgMail.setApiKey(keys.sendGridKey);
  const formattedRecipients = recipients.map(({email}) => email);
  const msg = {
    to: formattedRecipients,
    from: 'chaoyangfan@gmail.com',
    subject: subject,
    html: content,
  };
  await sgMail.send(msg);
  console.log("log inside !")
}