import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment as env } from "../environments/environment";
import { Subject, map } from 'rxjs';

import { Usuario } from "../models/Usuario";
import { UserDecode } from '../models/UserDecode';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  tokenValidation() {
    throw new Error('Method not implemented.');
  }

  URL= env.endpointURL;
  helper = new JwtHelperService();
  usuario: any | undefined;
  public $storageEvent: Subject<Usuario> = new Subject();
  decode!: UserDecode

  constructor(

    private http: HttpClient,
    private router: Router


  ) { }

  login(token: string) {
    if (!this.isTokenExpired(token)) {
      this.saveToken(token);
      this.decode = this.helper.decodeToken(token)! ;
    } else {
      // acá retorna que el token esta expirado y ya no sirve para hacer login
      return false
    }
    return this.decode;
  }

   /**
   *
   * @param token
   * @returns boolean
   */
   isTokenExpired(token: string) {

     //localStorage.getItem('token');
    return this.helper.isTokenExpired(token)
  }

   /**
   *
   * @param token:string
   */
   saveToken(token:string) : void {
    localStorage.setItem("token",token);
  }

   /**
   *
   * @returns el token del usuario
   */
   getToken(){
    const token = localStorage.getItem("token");
    return token;
  }

  tokenExpirateDate(token:string){
    return this.helper.getTokenExpirationDate(token);
  }

  verifyPermission(cdAplicacion: number, rut: string) {
    return this.http
      .post(`${this.URL}login/verPermiso`, {
        cdaplicacion: cdAplicacion,
        rut: rut,
      })
      .pipe(
        map((resp) => {
          // console.log(resp)
          this.usuario = resp
          // this.$storageEvent = this.usuario.data;
          return resp;
        })
      )
  }

  datosUsuarioConPermisos(cdAplicacion: number, rut: string) {
    return this.http.post(`${this.URL}login/verPermiso`, {
      cdaplicacion: cdAplicacion,
      rut: rut,
    }).pipe().subscribe((resp:any)=>{
      this.$storageEvent.next(resp)
    })

  }

  logoutToken(){
    localStorage.removeItem("token");
    localStorage.clear();
    sessionStorage.removeItem("tp")
    sessionStorage.clear();
    // window.location.href = ENV.auth;

  }

  decodeToken(token:string){
    return this.helper.decodeToken(token);
  }



}
