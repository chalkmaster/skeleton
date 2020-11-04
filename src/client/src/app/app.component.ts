import { Component, OnInit } from '@angular/core';
import { LoginService } from './login/login.service';
import { Router } from '@angular/router';
import { SessionHelper } from 'src/helpers/session.helper';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'skeleton';

  constructor(public loginService: LoginService, private router: Router) {
  }

  async ngOnInit() {
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
}
