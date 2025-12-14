import nodemailer from 'nodemailer';

interface EmailOptions {
  to: string | string[];
  subject: string;
  html: string;
  text?: string;
  replyTo?: string;
}

class EmailService {
  private transporter: nodemailer.Transporter;
  
  constructor() {
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: process.env.SMTP_PORT === '465',
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false
      }
    });
  }

  async sendEmail(options: EmailOptions): Promise<boolean> {
    try {
      const mailOptions = {
        from: `"RahulWebDev" <${process.env.FROM_EMAIL}>`,
        to: Array.isArray(options.to) ? options.to.join(', ') : options.to,
        subject: options.subject,
        html: options.html,
        text: options.text || this.stripHtml(options.html),
        replyTo: options.replyTo || process.env.FROM_EMAIL,
      };

      const info = await this.transporter.sendMail(mailOptions);
      console.log('Email sent:', info.messageId);
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }

  private stripHtml(html: string): string {
    return html
      .replace(/<[^>]*>/g, ' ')
      .replace(/\s+/g, ' ')
      .trim();
  }

  // Newsletter templates
  async sendWelcomeEmail(email: string, name?: string) {
    const subject = 'Welcome to My Newsletter! 🎉';
    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 40px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .btn { display: inline-block; padding: 12px 30px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Welcome Aboard! 🚀</h1>
            </div>
            <div class="content">
              <h2>Hi ${name || 'there'},</h2>
              <p>Thank you for subscribing to my newsletter! I'm excited to have you join our community of developers and tech enthusiasts.</p>

              <h3>What to expect:</h3>
              <ul>
                <li>📚 Weekly tech insights and tutorials</li>
                <li>💻 Project updates and behind-the-scenes</li>
                <li>🚀 Career tips for developers</li>
                <li>🎯 Exclusive content not published elsewhere</li>
              </ul>

              <p>I'll be sharing my journey building with React, Next.js, and modern web technologies. Feel free to reply to any email if you have questions or suggestions!</p>

              <p>Best regards,<br>
              <strong>Rahul Verma</strong><br>
              Full Stack Developer</p>
            </div>
            <div class="footer">
              <p>You're receiving this email because you subscribed to Rahul Verma's newsletter.</p>
              <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?email=${email}" style="color: #6b7280;">Unsubscribe</a> |
              <a href="${process.env.NEXT_PUBLIC_APP_URL}/preferences" style="color: #6b7280;">Manage Preferences</a></p>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
    });
  }

  // Backwards-compatible wrapper used by subscribe route
  async sendConfirmationEmail(email: string, name?: string, confirmationToken?: string) {
    return this.sendWelcomeEmail(email, name);
  }

  async sendNewsletter(email: string, name: string, content: string, subject: string) {
    // Replace placeholders in content
    const processedContent = content
      .replace(/\[unsubscribe_link\]/g, `${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?email=${email}`)
      .replace(/\[preferences_link\]/g, `${process.env.NEXT_PUBLIC_APP_URL}/preferences`);

    const html = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #10b981 0%, #0ea5e9 100%); color: white; padding: 30px 20px; text-align: center; border-radius: 12px 12px 0 0; }
            .content { background: #fff; padding: 30px; border-radius: 0 0 12px 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
            .article { margin: 30px 0; padding: 20px; background: #f9fafb; border-radius: 8px; border-left: 4px solid #10b981; }
            .btn { display: inline-block; padding: 12px 24px; background: #10b981; color: white; text-decoration: none; border-radius: 6px; font-weight: 600; }
            .footer { margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb; color: #6b7280; font-size: 14px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>${subject}</h1>
              <p>Your weekly dose of tech insights</p>
            </div>
            <div class="content">
              <p>Hi ${name},</p>
              ${processedContent}
              <div class="footer">
                <p>Happy coding! 🚀</p>
                <p><strong>Rahul Verma</strong><br>
                Full Stack Developer</p>
                <hr>
                <p>You're receiving this email because you subscribed to my newsletter.</p>
                <p><a href="${process.env.NEXT_PUBLIC_APP_URL}/api/newsletter/unsubscribe?email=${email}" style="color: #6b7280;">Unsubscribe</a> | 
                <a href="${process.env.NEXT_PUBLIC_APP_URL}/preferences" style="color: #6b7280;">Manage Preferences</a></p>
              </div>
            </div>
          </div>
        </body>
      </html>
    `;

    return this.sendEmail({
      to: email,
      subject,
      html,
    });
  }
}

// Singleton instance
const emailService = new EmailService();
export default emailService;