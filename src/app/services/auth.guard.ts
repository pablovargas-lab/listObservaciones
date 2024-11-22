import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import {AuthService } from './auth.service';
import { environment as env } from "../environments/environment";

export const authGuard: CanActivateFn = (route, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  if (auth.isTokenExpired(localStorage.getItem('token')!)){
    console.log("no entra")
    localStorage.removeItem('token');
    localStorage.clear();

    console.log("entra aca despues 2")
    window.location.href = env.urlLogout;

    return false;
      
    }
    else{
      console.log("entra")
     
      return true;
    }
  // return auth.tokenValidation().pipe(
  //   tap((isAuthenticated) => {
  //     if (!isAuthenticated) {
  //       router.navigateByUrl('/login');
  //     }
  //   })
  // );

};
