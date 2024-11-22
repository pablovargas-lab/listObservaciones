import { Component } from '@angular/core';
import { environment as env } from "../environments/environment";
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import Swal from 'sweetalert2';
import { AuthService } from '../services/auth.service';
import { LocationStrategy } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { Usuario } from '../models/Usuario';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;
  env = env;
  usuario: any;
  rut: any;
  usuariopermisos: Usuario | undefined;

  constructor(

    private authServices: AuthService,
    private router: Router,
    private acRoute: ActivatedRoute,
    private locationStrategy: LocationStrategy,
    private idle: Idle,
    private keepalive: Keepalive


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
          sessionStorage.setItem("tp", localStorage.getItem('token')!);


          //this.router.navigate(['Dashboard']);
        } else {


          localStorage.removeItem('token');
          localStorage.clear();

          window.location.href = this.env.auth;
          console.log(sessionStorage.getItem('tp'));


        }
      } else {


      //   localStorage.removeItem('token');
      //   localStorage.clear();
      //   window.location.href = this.env.auth;
      //  console.log("trae token");

      }
    });
  


    
  }

  ngOnInit(): void {

    this.idle.setIdle(5);

    this.idle.setTimeout(1800);

    this.idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    this.idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      if (this.timedOut == true) {

        localStorage.removeItem('token');
        localStorage.clear();
        console.log("entraaaaa");
        Swal
          .fire({
            title: "",
            text: "La sesión se ha cerrado automáticamente",
            icon: 'warning',
            confirmButtonText: "Aceptar",
          })
          .then(resultado => {
            if (resultado.value) {

              window.location.href = this.env.auth;
              localStorage.removeItem('token');


            } else {

              window.location.href = this.env.auth;
              localStorage.removeItem('token');
            }
          });

      }

    });

    this.idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!');
    this.idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!');


    this.keepalive.interval(15);

    this.keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  
    

    

  

    
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

}
