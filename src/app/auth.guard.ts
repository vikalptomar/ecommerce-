import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot,CanActivate,RouterStateSnapshot,UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { AdminService } from "./admin.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  constructor(private users:AdminService){}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
      debugger;
    return true;
  }
}



// import { CanActivateFn } from '@angular/router';


// export const authGuard: CanActivateFn = (route, state) => {

//   return true;
// };

