import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login/login.service';
import { Router } from '@angular/router';
import { UserData } from 'src/domain/entity/user-data';
import { SessionHelper } from 'src/helpers/session.helper';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userData: UserData;
  isLoggedInSubscription: Subscription;
  isLoggedIn: boolean;

  constructor(public loginService: LoginService, private router: Router) {
    this.isLoggedIn = false;
    this.isLoggedInSubscription = loginService.isLoggedIn.subscribe(isLoggedIn => this.onLoginChange(isLoggedIn));
  }

  async ngOnInit() {
    this.userData = await SessionHelper.getSession();
    this.isLoggedIn = !!this.userData;
  }

  async onLoginChange(isLoggedIn: boolean) {
    if (isLoggedIn) {
      this.userData = await SessionHelper.getSession();
    } else {
      this.userData = null;
    }
    this.isLoggedIn = isLoggedIn;
  }

  logout() {
    this.loginService.logout(this.userData.accessToken);
    this.userData = null;
    this.router.navigate(['login']);
  }
}
