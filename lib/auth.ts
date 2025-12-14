import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { emailOTP } from "better-auth/plugins";
import { connectDB } from "./mongodb";
import {
  resetPasswordTemplate,
  passwordResetSuccessTemplate,
} from "@/components/email-templates";
import emailService from "./email";

/* ------------------------------------------
   Create Auth Instance
------------------------------------------- */
const createAuth = async () => {
  const mongoose = await connectDB();
  const db = mongoose.connection.db!;

  return betterAuth({
    /* ---------------- Database ---------------- */
    database: mongodbAdapter(db, {
      client: mongoose.connection.getClient(),
    }),

    /* ---------------- Email + Password ---------------- */
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

    /* ---------------- SMTP Config (Zoho) ---------------- */
    email: {
      from: process.env.FROM_EMAIL!,
      sendOnSignUp: false,              // OTP handles verification
      sendOnForgotPassword: true,

      transport: {
        host: process.env.SMTP_HOST!,
        port: 587,                      // Zoho TLS
        secure: false,                  // MUST be false for 587
        auth: {
          user: process.env.SMTP_USER!,
          pass: process.env.SMTP_PASS!, // Zoho APP password
        },
        tls: {
          rejectUnauthorized: false,
        },
      },
    },

    /* ---------------- User Fields ---------------- */
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

    /* ---------------- Session ---------------- */
    secret: process.env.BETTER_AUTH_SECRET!,
    session: {
      expiresIn: 60 * 60 * 24 * 7, // 7 days
      updateAge: 60 * 60 * 24,     // 1 day
    },

    /* ---------------- CORS / Trusted Origins ---------------- */
    trustedOrigins: (
      process.env.NEXT_PUBLIC_TRUSTED_ORIGINS?.split(",") || [
        "http://localhost:3000",
      ]
    ).map((origin) => origin.trim()),

    /* ---------------- Plugins ---------------- */
    plugins: [
      emailOTP({
        sendVerificationOTP: async ({ email, otp, type }) => {
          if (type !== "email-verification") return;

          console.log("📨 Sending email verification OTP to:", email);

          await emailService.sendEmail({
            to: email,
            subject: "Verify your email address",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px;">
                <h2 style="text-align: center;">Verify Your Email</h2>
                <p>Use the OTP below to verify your email address:</p>
                <div style="text-align: center; margin: 24px 0;">
                  <span style="
                    font-size: 32px;
                    letter-spacing: 6px;
                    font-weight: bold;
                    background: #f3f4f6;
                    padding: 12px 24px;
                    border-radius: 8px;
                    display: inline-block;
                  ">
                    ${otp}
                  </span>
                </div>
                <p style="font-size: 14px; color: #666;">
                  This OTP will expire in 10 minutes.
                </p>
              </div>
            `,
          });
        },
      }),
    ],
  });
};

/* ------------------------------------------
   Export Auth
------------------------------------------- */
export const auth = await createAuth();
