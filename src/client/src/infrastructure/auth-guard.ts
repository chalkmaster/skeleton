import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { SessionHelper } from 'src/helpers/session.helper';
import { R } from './resources';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }

  async canActivate(router: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const userData = await SessionHelper.getSession();
    const canActivate = userData && !userData.isExpired;
    if (!canActivate) {
        sessionStorage.setItem(R.KEYS.REDIRECT, router.url[0].path);
        await this.router.navigate(['login']);
    }
    return canActivate;
  }
}
