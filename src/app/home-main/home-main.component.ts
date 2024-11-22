import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { MantenedorPersonaService } from 'src/app/services/mantenedor-persona.service';
import { environment as env } from "../environments/environment";
import { Usuario } from '../models/Usuario';
import { AuthService } from "../services/auth.service";
import { LocationStrategy } from '@angular/common';
import { Token } from '@angular/compiler';
import {Idle, DEFAULT_INTERRUPTSOURCES} from '@ng-idle/core';
import {Keepalive} from '@ng-idle/keepalive';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home-main',
  templateUrl: './home-main.component.html',
  styleUrls: ['./home-main.component.css']
})
export class HomeMainComponent implements OnInit {

  
  //idleState = 'Not started.';
  //timedOut = false;
  //lastPing?: Date;
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

    // idle.setIdle(5);
    
    // idle.setTimeout(1800);

    // idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    // idle.onIdleEnd.subscribe(() => this.idleState = 'No longer idle.');
    // idle.onTimeout.subscribe(() => {
    //   this.idleState = 'Timed out!';
    //   this.timedOut = true;
    //   if( this.timedOut==true ) {

    //     localStorage.removeItem('token');
    //     localStorage.clear();
    //     Swal
    //     .fire({
    //       title: "",
    //       text: "La sesión se ha cerrado automáticamente",
    //       icon: 'warning',
    //       confirmButtonText: "Aceptar",
    //     })
    //     .then(resultado => {
    //       if (resultado.value) {
       
    //         window.location.href = this.env.auth;
           

    //       } else {
            
    //         window.location.href = this.env.auth;
    //       }
    //     });
        
    //   }

    // });
    // idle.onIdleStart.subscribe(() => this.idleState = 'You\'ve gone idle!'); // empieza a contar el tiempo de inactividad
    // idle.onTimeoutWarning.subscribe((countdown) => this.idleState = 'You will time out in ' + countdown + ' seconds!'); //contador de tiempo de inactividad

    
    // keepalive.interval(15);

    // keepalive.onPing.subscribe(() => this.lastPing = new Date());

    // this.reset();


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
          sessionStorage.setItem("tp",localStorage.getItem('token')!);

          this.router.navigate(['Dashboard']);
        } else {

          
          localStorage.removeItem('token');
          localStorage.clear();

          console.log("entra aca primero")
          window.location.href = this.env.auth;


        }
      } else{

       
        localStorage.removeItem('token');
        localStorage.clear();
        console.log("entra aca despues 2")
        window.location.href = this.env.urlLogout;

      }
    });


  }

  ngOnInit(): void {
    
    history.pushState(null, "", location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, "", location.href);
    })

   
  }

  // reset() {
  //   this.idle.watch();
  //   this.idleState = 'Started.';
  //   this.timedOut = false;
  // }



}
