import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import * as handlebars from 'handlebars';

@Injectable()
export class MailService {
  private transporter: nodemailer.Transporter;

  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
    });
  }

  private resetPasswordTemplate = handlebars.compile(`
    <h1>Reset Your Password</h1>
    <p>Hello {{name}},</p>
    <p>We received a request to reset your password. Click the link below to set a new password:</p>
    <p>
      <a href="{{resetLink}}">Reset Password</a>
    </p>
    <p>This link will expire in 1 hour.</p>
    <p>If you didn't request this, you can safely ignore this email.</p>
  `);

  async sendResetPasswordEmail(
    to: string,
    name: string,
    resetToken: string,
  ): Promise<void> {
    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const htmlContent = this.resetPasswordTemplate({
      name,
      resetLink,
    });

    await this.transporter.sendMail({
      from: process.env.SMTP_FROM || 'noreply@example.com',
      to,
      subject: 'Reset Your Password',
      html: htmlContent,
    });
  }
}