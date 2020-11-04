import { Injectable } from '@angular/core';
import { LoginExternalApi } from './login.externalapi';
import { BehaviorSubject } from 'rxjs';
import { SessionHelper } from 'src/helpers/session.helper';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  public isLoggedIn: BehaviorSubject<boolean>;

  constructor(private loginApi: LoginExternalApi) {
    this.isLoggedIn = new BehaviorSubject(false);
  }

  async requestSmsToken(userName: string, password: string) {
    return await this.loginApi.requestSmsToken(userName, password);
  }

  async login(email: string, password: string, smsToken: string): Promise<void> {
    const jwtToken = (await this.loginApi.login(email, password, smsToken)).token;
    const success = !!await SessionHelper.setSession(jwtToken);
    this.isLoggedIn.next(success);
  }

  async logout(accessToken: string): Promise<void> {
    this.loginApi.logout(accessToken);
    const clearSuccess = await SessionHelper.clearSession();
    this.isLoggedIn.next(!clearSuccess);
  }

  async tryRenewJwtToken(actualToken: string): Promise<void> {
    const { newToken } = (await this.loginApi.renewJwtToken(actualToken));
    const success = !!await SessionHelper.setSession(newToken);
    this.isLoggedIn.next(success);
  }
}
