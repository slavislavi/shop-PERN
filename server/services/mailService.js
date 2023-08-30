const nodemailer = require('nodemailer');

class MailService {
    constructor() {
        this.transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: process.env.SMTP_PORT,
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD,
            },
        });
    }

    async sendActivationMail(to, link) {
        await this.transporter.sendMail({
            from: process.env.SMTP_USER,
            to,
            subject: `Account Verification for PERN-Shop`,
            text: 'Please, confirm your registration',
            html: `
                <div>
                    <h3>Follow the link to activate your account</h3>
                    <a href='${link}'>${link}</a>
                </div>
            `,
        });
    }
}

module.exports = new MailService();
