import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // aapka Cakelet email
    pass: process.env.EMAIL_PASS, // app password
  },
});

export async function sendEmail({ to, bcc, subject, html }) {
  await transporter.sendMail({
    from: `"Cakelet" <${process.env.EMAIL_USER}>`,
    to,      // Admin ya placeholder email
    bcc,     // subscribers array
    subject,
    html,
  });
}
