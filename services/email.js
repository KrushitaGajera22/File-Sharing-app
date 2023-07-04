const nodemailer = require("nodemailer");
async function sendMails({ from, to, subject, text, html }) {
  var transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.UserName, //sender's email
      pass: process.env.PASS, // sender's password
    },
  });

  let info = await transport.sendMail(
    {
      from: `inShare <${from}>`, //sender's email
      to: to, // Receiver's email
      subject: subject, //subject of email
      text: text,
      html: html, // html body
    },
    (err) => {
      if (err) {
        console.log(err);
      }
      console.log("Mail Sent");
    }
  );
}
module.exports = sendMails;
