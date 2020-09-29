// import { Injectable } from '@angular/core';
// import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
// import { AccountService } from '../_services/account.service';
// import {AuthService} from '../auth/auth.service';
// import {Observable} from 'rxjs';
//
// @Injectable({ providedIn: 'root' })
// export class AuthGuard implements CanActivate {
//     constructor(
//         private router: Router,
//         private accountService: AccountService,
//         public auth: AuthService,
//     ) {}
//
//     canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
//       console.log('redd');
//
//       const user = !!this.accountService.user.id;
//       if (user) {
//             return true;
//         } else if (!!this.auth.getToken()){
//           return false;
//           // this.accountService.getNotes();
//         } else {
//           this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
//           return false;
//         }
//     }
// }


import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from
    '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import {Router} from '@angular/router';
@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService,
              private myRoute: Router){
  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.auth.isLoggedIn()){
      return true;
    }else{
      this.myRoute.navigate(['login']);
      return false;
    }
  }
}
