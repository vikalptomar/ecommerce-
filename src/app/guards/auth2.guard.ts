import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot,UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "../services/admin.service";
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard2 implements CanActivate{
  constructor(private users:AdminService, private router:Router){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      
    if (localStorage.getItem('sessionToken')) {
      // Session exists, perform automatic login or redirect to protected route
       this.router.navigate(['products']);
       return true;
    } 
    
    return true;
  }
}



// import { CanActivateFn } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state) => {

//   return true;
// };

