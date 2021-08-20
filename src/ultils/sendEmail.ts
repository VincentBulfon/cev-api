import { createTransport } from "nodemailer";
type Token = string;

const transport = createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASSWORD,
  },
});

export default {
  resetPassword(token: Token) {
    // change"https://localhost:3000/" by ${process.env.CLIENT_URL} or a env var that contain the urul of the front-end
    const html = `
    <h1>Utilisez le lien suivant pour reinitialiser votre mot de passe sur le site du club d'escalade de Visé</h1>
    <a target="_blank" href="http://localhost:3000/auth/password/reset/${token}">http://localhost:3000/auth/password/reset/${token}</a>
    `;
    return html;
  },
  sendEmail(from: string, to: string, subject: string, html: string) {
    return new Promise((resolve, reject) => {
      transport.sendMail({ from, subject, to, html }, (err, info) => {
        if (err) reject(err);
        resolve(info);
      });
    });
  },
};
