const nodeMailer = require("nodemailer");

let transporter = nodeMailer.createTransport({
  host: "smtp.sendgrid.net",
  port: 587,
  secure: false,
  auth: {
    user: "apikey",
    pass: process.env.SENDGRID_API_KEY,
  },
});

async function sendEmail(toEmail) {
  let message = {
    from: {
      email: "julius.eronen@student.hamk.fi",
      name: "Julius from Watchlist.com",
    },
    bcc: toEmail,
    subject: "Welcome to our newsletter!",
    text: "Thank you for subscribing to our newsletter!",
    html: "Thank you for subscribing to our newsletter!",
  };

  transporter.sendMail(message);
  console.log("Email sent to ", toEmail);
}

async function broadcastNewsletter(toSavedEmails, subject, text, html) {
  let massMessage = {
    from: '"Julius from Watchlist" <julius.eronen@student.hamk.fi>',
    bcc: toSavedEmails,
    subject: subject,
    text: text,
    html: html,
  };

  await transporter.sendMail(massMessage);
  console.log("Broadcast emails sent successfully");
}

module.exports = { sendEmail, broadcastNewsletter };
