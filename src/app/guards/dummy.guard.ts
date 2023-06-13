import { CanActivateFn, Router } from '@angular/router';
import { Route } from '@angular/router';


export const dummyGuard: CanActivateFn = (route, state) => {
  console.log(state)
  console.log(route)

  return true;

};
