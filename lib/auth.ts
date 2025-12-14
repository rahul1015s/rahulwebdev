import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins";
import { connectDB } from "./mongodb";
import { resetPasswordTemplate, passwordResetSuccessTemplate } from "@/components/email-templates";
import emailService from "./email";

// Create auth configuration function
const createAuth = async () => {
  const mongooseConnection = await connectDB();
  const db = mongooseConnection.connection.db!;

  return betterAuth({
    database: mongodbAdapter(db, {
      client: mongooseConnection.connection.getClient(),
    }),
    emailAndPassword: {
      enabled: true,
      requireEmailVerification: true,
      minPasswordLength: 6,
      sendResetPassword: async ({ user, url }) => {
        await emailService.sendEmail({
          to: user.email,
          subject: "Reset your password",
          html: resetPasswordTemplate(url, user.email),
        });
      },
      onPasswordReset: async ({ user }) => {
        await emailService.sendEmail({
          to: user.email,
          subject: "Your password has been reset",
          html: passwordResetSuccessTemplate(user.email),
        });
      },
    },
    email: {
      from: process.env.FROM_EMAIL!,
      sendOnSignUp: false,
      sendOnForgotPassword: true,
      transport: {
        host: process.env.SMTP_HOST!,
        port: parseInt(process.env.SMTP_PORT!),
        secure: parseInt(process.env.SMTP_PORT!) === 465,
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!,
        },
      },
    },
    user: {
      additionalFields: {
        mobile: {
          type: "string",
          required: false,
          validate: (value: string) => /^[6-9]\d{9}$/.test(value),
        },
        role: {
          type: "string",
          defaultValue: "user",
          validate: (value: string) =>
            ["user", "admin", "consultant"].includes(value),
        },
      },
    },
    secret: process.env.BETTER_AUTH_SECRET!,
    session: {
      expiresIn: 60 * 60 * 24 * 7,  // 7 days
      updateAge: 60 * 60 * 24,        // 1 day
    },
    trustedOrigins: (
      process.env.NEXT_PUBLIC_TRUSTED_ORIGINS?.split(",") || [
        "http://localhost:3000",
        "http://localhost:3001",
      ]
    ).map((origin) => origin.trim()),
    plugins: [
      emailOTP({
        sendVerificationOTP: async ({ email, otp, type }) => {
          if (type === "email-verification") {
            await emailService.sendEmail({
              to: email,
              subject: "Verify your email - OTP Code",
              html: `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                  <h1 style="color: #333; text-align: center;">Verify Your Email</h1>
                  <p style="color: #666; font-size: 16px; line-height: 1.5;">
                    Welcome! Please verify your email address to complete your registration.
                  </p>
                  <div style="text-align: center; margin: 30px 0;">
                    <div style="background: #f8f9fa; border: 2px dashed #007bff; padding: 20px; border-radius: 10px; display: inline-block;">
                      <h2 style="color: #007bff; font-size: 32px; margin: 0; letter-spacing: 5px; font-family: monospace;">${otp}</h2>
                    </div>
                  </div>
                  <p style="color: #666; text-align: center;">
                    Enter this 6-digit OTP code on the verification page to complete your registration.
                  </p>
                  <p style="color: #999; font-size: 14px; text-align: center;">
                    This code will expire in 10 minutes for security reasons.
                  </p>
                </div>
              `,
            });
          }
        },
      }),
    ],
  });
};

export const auth = await createAuth();
