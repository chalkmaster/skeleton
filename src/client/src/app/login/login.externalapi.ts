import { Injectable } from '@angular/core';
import { SecHelper } from 'src/helpers/security.helper';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LoginExternalApi {
  options: {headers: {[key: string]: string}};
  constructor(private httpClient: HttpClient) {
  }

  private async getOptions(): Promise<{headers: {[key: string]: string}}> {
    return this.options || (this.options = {
      headers: { 'x-device-id': await SecHelper.getWorkstationFingerprint()}
    });
  }

  async requestSmsToken(email: string, password: string): Promise<{userPhone: string}> {
      return this.httpClient.post<{userPhone: string}>(`${environment.api_url}/auth/sendtoken`,
        { email, password },
        await this.getOptions()
      ).toPromise();
  }

  async renewJwtToken(jwtToken: string): Promise<{newToken: string}> {
    const options = await this.getOptions();
    options.headers['x-access-token'] = jwtToken;

    return this.httpClient.post<{newToken: string}>(`${environment.api_url}/auth/refreshtoken`,
      { h: 1},
      options
    ).toPromise();
  }

  async login(email: string, password: string, smsToken: string): Promise<{ token: string}> {
    const options = await this.getOptions();
    options.headers['x-device-location'] = await SecHelper.getWorkstationLocation();
    return this.httpClient.post<{ token: string}>(`${environment.api_url}/auth/login`,
      { email, password, smsToken },
      options
    ).toPromise();
  }

  async logout(jwtToken: string): Promise<void> {
    const options = await this.getOptions() as any;
    options.headers['x-access-token'] = jwtToken;
    options.responseType = 'text';
    this.httpClient.post<any>(`${environment.api_url}/auth/logout`,
      { g: 0 },
      options,
    ).toPromise();
  }
}
