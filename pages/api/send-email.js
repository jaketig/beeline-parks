const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 465,
  secure: true,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({success: false, message: "invalid http method"});
  }

  try {

    // verify connection configuration
    transporter.verify(function (error, success) {
      if (error) {
        return res.status(500).json({success: false, message: "SMTP transport Error", error})
      }
    });

    const mailBody = JSON.parse(req.body);

    await transporter.sendMail(mailBody);
    return res.status(200).json({success: true, message: "mail successfully sent"})
  } catch (ex) {
    console.error(ex)
    return res.status(500).json({success: false, message: ex.message || "Unexptected Error:"})
  }
}
