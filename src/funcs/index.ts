import * as CryptoJS from 'crypto-js';

export function hashedText(text: string): string {
  return CryptoJS.SHA256(text).toString();
}