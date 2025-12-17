import { TOTP, Secret } from 'otpauth';
import QRCode from 'qrcode';

export function generateTOTPSecret(): string {
  const secret = new Secret();
  return secret.base32;
}

export async function generateQRCode(secret: string): Promise<string> {
  const totp = new TOTP({
    issuer: 'factiii.io',
    label: 'Admin',
    algorithm: 'SHA1',
    digits: 6,
    period: 30,
    secret: Secret.fromBase32(secret),
  });
  
  const uri = totp.toString();
  return await QRCode.toDataURL(uri);
}

export function validateTOTP(token: string, secret: string): boolean {
  try {
    const totp = new TOTP({
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: Secret.fromBase32(secret),
    });
    
    const delta = totp.validate({ token, window: 1 });
    return delta !== null;
  } catch (error) {
    console.error('TOTP validation error:', error);
    return false;
  }
}
