import { Injectable, inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, catchError, map, of } from 'rxjs';
import { environment as env } from "../environments/environment";

Injectable({
  providedIn: 'root'
})
// export const usuarioMaritimoGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {

//   const url: string = state.url;

//     return this.checkAuthentication(url);


//return true;


// };
// export class AuthGuard implements CanActivate {
//   constructor(private authService: AuthService, private router: Router) {}

//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
//     const url: string = state.url;

//     return this.checkAuthentication(url);
//   }

//   private checkAuthentication(url: string): boolean {
//     if (this.authService.isTokenExpired(sessionStorage.getItem('tp')!)) {
//       return true;
//     } else {
//       this.router.navigate(['/login']);
//       return false;
//     }
//   }
// }
// export class UsuarioMaritimoGuard implements CanActivate {
//   constructor(private authService: AuthService){

//   }
//   canActivate(
//     route: ActivatedRouteSnapshot,
//     state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     console.log("SessionStorage:",sessionStorage.getItem('tp'));
//     console.log("TIpo usuario:", sessionStorage.getItem('tipoUsuario'));
//     console.log(this.authService.isTokenExpired(sessionStorage.getItem('tp')!));



//       if(this.authService.isTokenExpired(sessionStorage.getItem('tp')!)){

//         console.log("retorna true");

//         return true;
//       }else{
//         console.log("retorna false");

//         return false;
//       }

//       // return true;
//   }

export const usuarioMaritimoGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree => {





  const router: Router = inject(Router);
  const authService = inject(AuthService);
  //console.log(tokenStorage.isTokenExpired(params['token']))
  //console.log(authService.isTokenExpired(sessionStorage.getItem('tp')!));

  if (authService.isTokenExpired(localStorage.getItem('tp')!)) {

    //console.log("entra al if 22222")
    //console.log("retorna true");
    //   //return router.navigate(['forbidden']);    
    //window.location.href = env.auth;
    //   return false;
    return true;

  }
  else {

    //console.log("retorna false");
    //   console.log(localStorage.getItem('token'))
    //   console.log("entra aca")
      //window.location.href = env.auth;
    //   return true;
    return false;
  }

  //authServices.getToken()


}

