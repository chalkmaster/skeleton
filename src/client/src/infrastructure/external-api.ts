import { Injectable } from '@angular/core';
import { SecHelper } from 'src/helpers/security.helper';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { SessionHelper } from 'src/helpers/session.helper';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/login/login.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { R } from './resources';

@Injectable({
  providedIn: 'root'
})
export class ExternalApi {
  options: { headers: { [key: string]: string } };
  constructor(private httpClient: HttpClient,
              private router: Router,
              private loginService: LoginService,
              private snackBar: MatSnackBar
  ) {
  }

  async getAccessToken(): Promise<string> {
    let userData = await SessionHelper.getSession();
    if (!userData) {
      await this.router.navigate(['login']);
      return;
    }

    if (userData.isExpired) {
      try {
        await this.tryRenew();
        userData = await SessionHelper.getSession();
      } catch (err) {
        await SessionHelper.clearSession();
        await this.router.navigate(['login']);
      }
    }

    return userData.accessToken;
  }

  async tryRenew() {
    const userData = await SessionHelper.getSession();
    if (!userData) {
      await this.router.navigate(['login']);
      return;
    }
    if (userData.isExpired) {
      try {
        await this.loginService.tryRenewJwtToken(userData?.accessToken || '');
      } catch (err) {
        await SessionHelper.clearSession();
        await this.router.navigate(['login']);
      }
    }
  }

  protected async getOptions(): Promise<{ headers: { [key: string]: string } }> {
    return this.options || (this.options = {
      headers: { 'x-device-id': await SecHelper.getWorkstationFingerprint() }
    });
  }

  protected async getWithRetry(url: string, options?: any) {
    let attempts = 0;
    let response: any;
    if (!options) {
      options = await this.getOptions();
    }

    do {
      attempts++;
      console.debug('getWithRetry - attempts', attempts);
      try {

        options.headers[R.REQUEST_HEADERS.ACCESS_TOKEN] = await this.getAccessToken();
        options.headers[R.REQUEST_HEADERS.DEVICE_LOCATION] = await SecHelper.getWorkstationLocation();
        response = await this.httpClient.get<any>(url, options).toPromise();
        return response;

      } catch (err) {
        console.debug('getWithRetry - err', err);
        const httpError = err as HttpErrorResponse;

        if (httpError.status === 401 && attempts === 1) {
          console.debug('getWithRetry - 401');
          await this.tryRenew();
        } else if (httpError.status === 429) {
          console.debug('getWithRetry - 429');
          this.snackBar.open(R.ERROR_MESSAGE.QUOTA_EXCEEDED,
            R.OK,
            { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
          );
          await this.router.navigate(['/']);
        } else {
          console.debug('getWithRetry - 500');
          this.snackBar.open(
            R.ERROR_MESSAGE.GENERIC_HTTP_ERROR,
            R.OK,
            { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
          );
          throw err;
        }
      }
    } while (attempts < 2);

    return response;
  }
}
