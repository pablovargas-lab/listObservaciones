import { LocationStrategy } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  usuario: any;




  constructor(
    private authServices: AuthService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy,

  ) {

    this.acRoute.params.subscribe((params) => {
      

      if (params['token']) {
        let expired;

        expired = this.authServices.isTokenExpired(params['token']);

        if (!expired) {

          this.usuario = this.authServices.login(params['token']);
          
          sessionStorage.setItem("usr", this.usuario.usr);
          sessionStorage.setItem("nom", this.usuario.nom);
          sessionStorage.setItem("mai", this.usuario.mai);
          sessionStorage.setItem("rut", this.usuario.rut);
          sessionStorage.setItem("rep", this.usuario.reparticion.descripcion);
          sessionStorage.setItem("descripcion", this.usuario.descripcion);

          // if (this.usuario.permisos.length >= 1) {
          //   this.authServices.verifyPermission(68, this.usuario.usr)


          // }


        }

      }


    })

  }

  ngOnInit(): void {

  }
}
