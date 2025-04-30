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
    from: "julius.eronen@student.hamk.fi",
    to: toEmail,
    subject: "Welcome to our newsletter!",
    text: "Thank you for subscribing to our newsletter!",
    html: "Thank you for subscribing to our newsletter!",
  };

  await transporter.sendMail(message);
  console.log("Email sent to ", toEmail);
}

module.exports = { sendEmail };
