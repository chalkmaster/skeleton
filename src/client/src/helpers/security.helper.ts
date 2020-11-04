import { getPromise as getFingerPrint, x64hash128 } from 'fingerprintjs2';
import * as CryptoJS from 'crypto-js';
import { R } from 'src/infrastructure/resources';

export class SecHelper {
  static workstationFingerPrint: string | PromiseLike<string>;

  static async encriptText(plainText: string): Promise<string> {
    try {
      return CryptoJS.AES.encrypt(plainText, await SecHelper.getWorkstationFingerprint()).toString();
    } catch (err) {
      console.error(err);
    }
  }

  static async decriptyText(cipherText: string): Promise<string> {
    try {
      return CryptoJS.AES.decrypt(cipherText, await SecHelper.getWorkstationFingerprint()).toString(CryptoJS.enc.Utf8);
    } catch (err) {
      console.error(err);
    }
  }

  static async getHash(text: string) {
    try {
      const msgUint8 = new TextEncoder().encode(text);
      const hashBuffer = await crypto.subtle.digest('SHA-256', msgUint8);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
      return hashHex;
    } catch (err) {
      console.error(err);
    }
  }

  static async getWorkstationLocation(): Promise<string> {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          resolve(
            JSON.stringify(
              `${position.coords.latitude},${position.coords.longitude}@prec:${position.coords.accuracy}, alt:${position.coords.altitude}`
            )
          );
        }, (err) => reject(err));
      } else {
        reject(new Error(R.ERROR_MESSAGE.GPS_ERROR));
      }
    });
  }

  static async getWorkstationFingerprint(): Promise<string> {
    if (this.workstationFingerPrint) {
      console.debug('Using FingerPrint Cache');
      return this.workstationFingerPrint;
    }
    console.debug('Collecting FingerPrint');
    const components = await getFingerPrint();
    const values = components.map(component => component.value);
    return (this.workstationFingerPrint = x64hash128(values.join(''), 31));
  }
}
