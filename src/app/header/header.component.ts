import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MantenedorPersonaService } from 'src/app/services/mantenedor-persona.service';
import { SharedDataService } from '../services/shared-data.service';



@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombre : any;
  rut: any;
  rowObs:any
  descripcion!:any;
  rep!:any;
  constructor(
    private router: Router,
    private _mPersonaService: MantenedorPersonaService,
    private _sharedDataService: SharedDataService,

  ) { }

  ngOnInit(): void {
    //this.getDatosPersona();
    this.nombre = sessionStorage.getItem('nom');
    this.rowObs = sessionStorage;
    this._sharedDataService.passSessionInf$.emit(this.rowObs);
    this.descripcion  = sessionStorage.getItem('descripcion');
    this.rep = sessionStorage.getItem('rep');
  }


  // irPerfil() {
  //   // console.log("ir al perfil con el siguiente rut +17790864");
  //   this.router.navigate(['usuario-maritimo/persona/',sessionStorage.getItem('rut')]);
  // }

  cerrarSesion(){
    //console.log("CERRAR SESIÓN");
    // this.authService.logoutToken();
    localStorage.removeItem('token');
    sessionStorage.removeItem('tp');
    sessionStorage.removeItem('rut');
    sessionStorage.removeItem('usr');
    sessionStorage.removeItem('rep');
    sessionStorage.removeItem('nom');
    sessionStorage.removeItem('mai');
    sessionStorage.removeItem('descripcion');
    sessionStorage.removeItem('IDPersona');
    sessionStorage.removeItem('tipoUsuario');
    sessionStorage.removeItem('IDPersonaSolicitud');
    localStorage.clear();
    //this.router.navigate(['login']);
  }

  // getDatosPersona(){
  //   this._mPersonaService.obtieneDatosPersona(parseInt(sessionStorage.getItem('rut') || "[]"))
  //                         .subscribe((doc:any) => {
  //                           console.log(doc.data);
  //                           //this.nombre = doc.data[0].nombre;
  //                           this.rut = doc.data[0].NRRut;
  //                           sessionStorage.setItem("IDPersona",doc.data[0].IDPersona);
  //                           //console.log(this.nombre);
  //                           //console.log(this.rut);
                            
                            
  //                           //console.log("Datos", doc.data[0].nombre);
  //                         })
  // }

  refreshPage() {
   window.location.reload();
  }
}
