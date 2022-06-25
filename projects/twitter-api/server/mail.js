const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

exports.sendMail = function ({ to, from, subject, text, html }) {
  return sgMail.send({
    to,
    from: from ?? process.env.SENDGRID_API_SENDER,
    subject,
    text,
    html,
  });
};
