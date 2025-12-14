export function resetPasswordTemplate(resetUrl: string, email: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Reset Your Password</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .button { display: inline-block; background: #667eea; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; font-weight: bold; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Reset Your Password</h1>
      </div>
      <div class="content">
        <p>Hello,</p>
        <p>You have requested to reset your password for your account (${email}).</p>
        <p>Please click the button below to reset your password:</p>
        <div style="text-align: center;">
          <a href="${resetUrl}" class="button">Reset Password</a>
        </div>
        <p><strong>Important:</strong> This link will expire in 1 hour for security reasons.</p>
        <p>If you didn't request this password reset, please ignore this email. Your password will remain unchanged.</p>
        <p>If the button doesn't work, you can copy and paste this link into your browser:</p>
        <p style="word-break: break-all; background: #e9ecef; padding: 10px; border-radius: 5px;">${resetUrl}</p>
      </div>
      <div class="footer">
        <p>This email was sent by RahulWebDev. If you have any questions, please contact our support team.</p>
      </div>
    </body>
    </html>
  `;
}

export function passwordResetSuccessTemplate(email: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Password Reset Successful</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #28a745 0%, #20c997 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
        .success-icon { font-size: 48px; color: #28a745; text-align: center; margin: 20px 0; }
        .footer { text-align: center; margin-top: 30px; color: #666; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="header">
        <h1>Password Reset Successful</h1>
      </div>
      <div class="content">
        <div class="success-icon">✓</div>
        <p>Hello,</p>
        <p>Your password has been successfully reset for your account (${email}).</p>
        <p>You can now log in with your new password.</p>
        <p>If you did not make this change, please contact our support team immediately.</p>
        <div style="background: #e9ecef; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <strong>Security Reminder:</strong>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Use a strong, unique password</li>
            <li>Never share your password with anyone</li>
            <li>Enable two-factor authentication if available</li>
          </ul>
        </div>
      </div>
      <div class="footer">
        <p>This email was sent by RahulWebDev. If you have any questions, please contact our support team.</p>
      </div>
    </body>
    </html>
  `;
}