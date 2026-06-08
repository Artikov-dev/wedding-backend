import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: Number(process.env.SMTP_PORT) || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

type OtpPurpose = 'email_verification' | 'password_reset' | 'phone_verification';

const subjects: Record<OtpPurpose, string> = {
  email_verification: 'Email tasdiqlash kodi',
  password_reset: 'Parolni tiklash kodi',
  phone_verification: 'Telefon tasdiqlash kodi',
};

const bodies: Record<OtpPurpose, (otp: string) => string> = {
  email_verification: (otp) =>
    `<p>Emailingizni tasdiqlash uchun quyidagi kodni kiriting:</p><h2>${otp}</h2><p>Kod 10 daqiqa davomida amal qiladi.</p>`,
  password_reset: (otp) =>
    `<p>Parolingizni tiklash uchun quyidagi kodni kiriting:</p><h2>${otp}</h2><p>Kod 10 daqiqa davomida amal qiladi.</p>`,
  phone_verification: (otp) =>
    `<p>Telefoningizni tasdiqlash uchun quyidagi kodni kiriting:</p><h2>${otp}</h2><p>Kod 10 daqiqa davomida amal qiladi.</p>`,
};

export async function sendOTPEmail(email: string, otp: string, purpose: OtpPurpose): Promise<void> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.log(`[EMAIL SKIP] SMTP not configured. OTP for ${email} (${purpose}): ${otp}`);
    return;
  }

  const subject = subjects[purpose] ?? 'Tasdiqlash kodi';
  const html = bodies[purpose]?.(otp) ?? `<p>Sizning kodingiz: <strong>${otp}</strong></p>`;

  try {
    await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: email,
      subject,
      html,
    });
  } catch (err) {
    console.error('[EMAIL ERROR]', err);
    throw new Error('Failed to send email. Please check SMTP configuration.');
  }
}
