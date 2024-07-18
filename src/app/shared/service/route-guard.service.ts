import { Injectable } from '@angular/core';
import {
  ActivatedRoute,
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { CookieService } from './cookieService/cookie.service';

@Injectable({
  providedIn: 'root',
})
export class RouteGuardService implements CanActivate {
  constructor(public router: Router, private cookieService: CookieService) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    let returnVal = true;
    const cookieData = this.cookieService.getCookie('user');
    console.log('cookieData', cookieData)
    const querySplit = state.url.split('?');
    const urlArray = querySplit[0].split('/');
    urlArray.splice(0, 1);
    
    if (urlArray[1] === 'detail') {
      const parsedData = JSON.parse(cookieData);
      console.log(parsedData, 'parsedData')
      returnVal = parsedData.user.role === 'all';
    } else {
      returnVal = cookieData ? true : false;
    }
    return returnVal ? true : (this.router.navigate(['']), false);
  }

  // getCookie(name) {
  //   var nameEQ = name + '=';
  //   var ca = document.cookie.split(';');
  //   for (var i = 0; i < ca.length; i++) {
  //     var c = ca[i];
  //     while (c.charAt(0) == ' ') c = c.substring(1, c.length);
  //     if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  //   }
  //   return null;
  // }
}
