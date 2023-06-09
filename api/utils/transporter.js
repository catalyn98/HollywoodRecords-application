const nodemailer = require("nodemailer");

require("dotenv").config("./.env");

let transporter = nodemailer.createTransport({
  service: process.env.SERVICE,
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

module.exports = transporter;
