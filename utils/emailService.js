import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Create email transporter using Amazon SES
 */
const transporter = nodemailer.createTransport({
  host: 'email-smtp.us-east-1.amazonaws.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD
  }
});

/**
 * Send password reset email
 * @param {string} email - Recipient email
 * @param {string} name - User/Student name
 * @param {string} resetUrl - Reset password URL
 */
export const sendPasswordResetEmail = async (email, name, resetUrl) => {
  try {
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: email,
      subject: 'Password Reset Request - EspaBackend',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #333; border-bottom: 2px solid #007bff; padding-bottom: 10px;">
            Password Reset Request
          </h2>
          
          <p>Dear <strong>${name}</strong>,</p>
          
          <p>We received a request to reset your password. Click the link below to create a new password:</p>
          
          <div style="margin: 30px 0; text-align: center;">
            <a href="${resetUrl}" 
               style="background-color: #007bff; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; font-weight: bold;">
              Reset Password
            </a>
          </div>
          
          <p style="color: #666;">Or copy and paste this link in your browser:</p>
          <p style="background-color: #f5f5f5; padding: 10px; word-break: break-all; color: #007bff;">
            ${resetUrl}
          </p>
          
          <p style="color: #ff6b6b; font-weight: bold;">
            ⚠️ This link will expire in 15 minutes
          </p>
          
          <p style="color: #666; font-size: 14px;">
            If you didn't request this reset, please ignore this email or contact support.
          </p>
          
          <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;">
          
          <p style="color: #999; font-size: 12px; text-align: center;">
            EspaBackend © 2025. All rights reserved.
          </p>
        </div>
      `
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Reset email sent successfully to:', email);
    console.log('Message ID:', info.messageId);
    return true;
  } catch (err) {
    console.error('❌ Error sending reset email:', err.message);
    throw new Error('Failed to send reset email');
  }
};

/**
 * Verify email transporter connection
 */
export const verifyEmailTransporter = async () => {
  try {
    await transporter.verify();
    console.log('✅ Email transporter verified');
    return true;
  } catch (err) {
    console.error('❌ Email transporter verification failed:', err.message);
    return false;
  }
};
