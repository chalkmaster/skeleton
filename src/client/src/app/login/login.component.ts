import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpErrorResponse } from '@angular/common/http';
import { R } from 'src/infrastructure/resources';
import { SessionHelper } from 'src/helpers/session.helper';
import { SecHelper } from 'src/helpers/security.helper';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, AfterViewInit {
  step: number;
  username: string;
  password: string;
  smsToken: string;
  isLoading = false;
  appVersion: string;
  location: string;
  invalidLocation = false;
  animateShake = false;
  userAuthPhone = '';

  @ViewChild('usernameField', { static: false }) usernameField: ElementRef;
  @ViewChild('passwordField', { static: false }) passwordField: ElementRef;
  @ViewChild('tokenField', { static: false }) tokenField: ElementRef;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.appVersion = environment.version;
    this.step = 1;
  }

  async ngOnInit() {
    this.isLoading = true;
    setTimeout(async () => {
      const userData = await SessionHelper.getSession();
      this.isLoading = false;
      if (userData && !userData.isExpired) {
        this.router.navigate([this.getRedirectURL()]);
        return;
      }
    }, 1000);

    try {
      this.location = await SecHelper.getWorkstationLocation();
      this.invalidLocation = false;
    } catch (error) {
      this.snackBar.open(R.ERROR_MESSAGE.GPS_ERROR, R.OK, { duration: environment.SNACK_ERROR_MESSAGE_DURATION });
      this.invalidLocation = true;
    }
  }

  getRedirectURL(): string {
    const url = sessionStorage.getItem(R.KEYS.REDIRECT) || '';
    sessionStorage.removeItem(R.KEYS.REDIRECT);
    console.log('redirect', url);
    return url;
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.usernameField.nativeElement.focus();
    });
  }

  async next() {
    switch (this.step) {
      case 1:
        this.step++;
        setTimeout(() => this.passwordField.nativeElement.focus());
        break;
      case 2:
        if (await this.requestSmsToken(this.username, this.password)) {
          this.step++;
          setTimeout(() => this.tokenField.nativeElement.focus());
        } else {
          this.previous();
        }
        break;
      case 3:
        this.login(this.username, this.password, this.smsToken);
        break;
      default:
        this.step = 1;
        setTimeout(() => this.usernameField.nativeElement.focus());
    }
  }

  previous() {
    switch (this.step) {
      case 2:
        this.step--;
        setTimeout(() => this.usernameField.nativeElement.focus());
        break;
      case 3:
        this.step--;
        setTimeout(() => this.passwordField.nativeElement.focus());
        break;
      default:
        this.step = 1;
        setTimeout(() => this.passwordField.nativeElement.focus());
    }
  }

  async requestSmsToken(userName: string, passwrod: string): Promise<boolean> {
    try {
      this.isLoading = true;
      this.userAuthPhone = (await this.loginService.requestSmsToken(userName, passwrod)).userPhone;
      return true;
    } catch (err) {
      const error = err as HttpErrorResponse;
      if (error.status === 401) {
        this.snackBar.open(
          R.ERROR_MESSAGE.NOT_AUTORIZED,
          R.OK,
          { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
        );
      } else if (error.status === 429) {
        this.snackBar.open(
          R.ERROR_MESSAGE.TOO_MANY_LOGIN_ATTEMPTS,
          R.OK,
          { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
        );
      } else {
        this.snackBar.open(
          R.ERROR_MESSAGE.GENERIC_LOGIN_EXCEPTION,
          R.OK,
          { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
        );
      }
      this.shake();
      this.step = 2;
      return false;
    } finally {
      this.isLoading = false;
    }
  }

  async login(email: string, password: string, smsToken: string) {
    try {
      this.isLoading = true;
      await this.loginService.login(email, password, smsToken);
      return this.router.navigate([this.getRedirectURL()]);
    } catch (err) {
      const error = err as HttpErrorResponse;
      if (error.status === 401) {
        this.snackBar.open(
          R.ERROR_MESSAGE.NOT_AUTORIZED,
          R.OK,
          { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
        );
      } else if (error.status === 429) {
        this.snackBar.open(
          R.ERROR_MESSAGE.TOO_MANY_LOGIN_ATTEMPTS,
          R.OK,
          { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
        );
      } else {
        this.snackBar.open(
          R.ERROR_MESSAGE.GENERIC_LOGIN_EXCEPTION,
          R.OK,
          { duration: environment.SNACK_ERROR_MESSAGE_DURATION }
        );
      }
      this.shake();
    } finally {
      this.isLoading = false;
    }
  }

  shake() {
    setTimeout(() => {
      this.animateShake = true;
    });
    setTimeout(() => {
      this.animateShake = false;
    }, 500);
  }

}
