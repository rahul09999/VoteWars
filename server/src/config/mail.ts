import nodemailer from "nodemailer";
// console.log(`user: ${process.env.SMTP_HOST}`);
// console.log(`user: ${process.env.SMTP_PASSWORD}`);
export const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: 587,
  secure: false, // true for port 465, false for other ports
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  },
});

export const sendMail = async (to: string, subject: string, body: string) => {
  await transporter.sendMail({
    from: process.env.FROM_EMAIL,
    to: to,
    subject: subject,
    html: body,
  });
};
