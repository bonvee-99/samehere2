// const jwt = require("jsonwebtoken");
// require("dotenv").config();
// const nodemailer = require("nodemailer");

// const transporter = nodemailer.createTransport({
//   service: "Gmail",
//   auth: {
//     user: process.env.GMAIL_USER,
//     pass: process.env.GMAIL_PASS,
//   },
// });

// // provides user jwt token after login
// const jwtGenerator = (user_id) => {
//   const payload = {
//     user: {
//       id: user_id,
//     },
//   };

//   return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1hr" });
// };

// // sends jwt token to user's email addreess
// const jwtEmailGenerator = async (user_id, user_email) => {
//   const payload = {
//     user: {
//       id: user_id,
//     },
//   };

//   try {
//     const emailToken = jwt.sign(payload, process.env.emailSecret, {
//       expiresIn: "1d",
//     });

//     let url;

//     if (process.env.NODE_ENV === "production") {
//       url = `https://same-here.herokuapp.com/auth/confirmation/${emailToken}`;
//     } else {
//       url = `http://localhost:5000/auth/confirmation/${emailToken}`;
//     }

//     await transporter.sendMail({
//       to: user_email,
//       subject: "Confirm Email",
//       html: `Please click this link to verify your email: <a href="${url}">${url}</a>`,
//     });
//   } catch (error) {
//     console.error(error.message);
//   }
// };

// module.exports = {
//   jwtGenerator,
//   jwtEmailGenerator,
// };
