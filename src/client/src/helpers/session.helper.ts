import { SecHelper } from 'src/helpers/security.helper';
import * as jwtDecode from 'jwt-decode';
import { UserData } from 'src/domain/entity/user-data';

export class SessionHelper {
  private static cipherSessioKey: string;

  private static async getKey(): Promise<string>{
    return SessionHelper.cipherSessioKey || (SessionHelper.cipherSessioKey = await SecHelper.getHash('SESSION-DATA'));
  }

  static async setSession(jwtToken: string): Promise<UserData> {
    const key: string = await SessionHelper.getKey();
    const userData = jwtDecode(jwtToken) as UserData;
    userData.accessToken = jwtToken;
    userData.expiresAt = new Date(userData.exp * 1000);
    userData.isExpired = false;
    const userDataString = JSON.stringify(userData);
    const cipherText = await SecHelper.encriptText(userDataString);
    localStorage.setItem(key, cipherText);
    return userData;
  }

  static async getSession(): Promise<UserData> {
    const key: string = await SessionHelper.getKey();
    const cipherText = localStorage.getItem(key);
    if (!cipherText) {
      return;
    }

    const userDataString = await SecHelper.decriptyText(cipherText);
    if (!userDataString) {
      SessionHelper.clearSession();
      return;
    }
    const userData = JSON.parse(userDataString) as UserData;
    userData.expiresAt = new Date(userData.expiresAt);

    if (userData.expiresAt < new Date()){
      userData.isExpired = true;
    }

    return userData;
  }

  static async clearSession(): Promise<boolean> {
    const key: string = await SessionHelper.getKey();
    localStorage.removeItem(key);
    return true;
  }
}
