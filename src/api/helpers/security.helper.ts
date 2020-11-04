var crypto = require('crypto');

export class SecurityHelper {
  static getHash(text: string): string {
    try {
      return crypto.createHash('sha256').update(text).digest('hex');
    } catch (err) {
      console.error(err);
    }
    return text;
  }
}