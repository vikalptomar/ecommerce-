import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../services/admin.service";
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private users: AdminService, private router: Router) { }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {

    let token: any = localStorage.getItem('sessionToken')

    const decryptKey = CryptoJS.AES.decrypt(token, 'my-secret-key')

    var originalText = decryptKey.toString(CryptoJS.enc.Utf8);

    // console.log(JSON.parse(originalText))

    if (!localStorage.getItem('sessionToken')) {

      // Session exists, perform automatic login or redirect to protected route

      this.router.navigate(['']);
      return true;
    }
    return true;
  }
}



// import { CanActivateFn } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state) => {

//   return true;
// };

