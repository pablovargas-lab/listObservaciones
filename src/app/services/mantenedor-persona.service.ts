import { Injectable } from '@angular/core';
import { environment as ENV } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseComuna } from '../models/Comuna';
import { ResponseRegion } from '../models/Region';
import { ResponseEmail } from '../models/Email';
import { ResponseDireccion } from '../models/Direccion';
import { ResponseTelefono } from '../models/Telefono';
import { FormContacto } from '../models/FormContacto';

@Injectable({
  providedIn: 'root'
})
export class MantenedorPersonaService {

  URL = ENV.endpointURL

  constructor(
    private http: HttpClient
  ) { }

  
  obtieneDatosPersona(rut:number): Observable<any>{
    return this.http.get<any>(`${this.URL}personas/datospersona/${rut}`);
  }
  /**
   *
   * @returns Todas las comunas de chile <T>
   */
  obtienecomuna(): Observable<ResponseComuna> {
    return this.http.get<ResponseComuna>(`${this.URL}personas/obtienecomuna`);
  }

  
  /**
   *
   * @returns Todas las regiones de chile <T>
   */
  obtieneregion(): Observable<ResponseRegion> {
    return this.http.get<ResponseRegion>(`${this.URL}personas/obtieneregion`);
  }

  /**
   *
   * @param CDTPRegion parametro numerico
   * @returns retorna las comunas que estan asociadas a una región
   */
  obtienecomunaporregion(CDTPRegion: number): Observable<ResponseComuna> {
    return this.http.get<ResponseComuna>(`${this.URL}personas/obtienecomunaporregion/${CDTPRegion}`);
  }

  /**
   *
   * @param NRRut parametro numerico
   * @returns Los Correo que puede tener una persona
   */
  getemailxrut(NRRut: number): Observable<ResponseEmail> {
    return this.http.get<ResponseEmail>(`${this.URL}personas/emailxrut/${NRRut}`);
  }

  /**
   *
   * @param NRRut parametro numerico
   * @returns la direccion postal de una persona
   */
  getdireccionxrut(NRRut: number): Observable<ResponseDireccion> {
    return this.http.get<ResponseDireccion>(`${this.URL}personas/direccionxrut/${NRRut}`);
  }

  /**
   * @param NRRut parametro numerico
   * @returns la telefono/os de una persona
   */
  gettelefonoxrut(NRRut: number): Observable<ResponseTelefono> {
    return this.http.get<ResponseTelefono>(`${this.URL}personas/telefonoxrut/${NRRut}`);
  }

  crearpersonanatural(
    NRRut: number,
    DV: any,
    NMPrimerNom: string,
    NMSegundoNom: string,
    APPaterno: string,
    APMaterno: string,
    CDTPProfesion: number,
    CDEstadoCivil: number,
    sexo: number,
    cdnacionalidad: string,
    rol: number,
    rutingreso: number,
  ) {
    return this.http.post(`${this.URL}personas/CreaPersonaNatural`, {
      NRRut: NRRut,
      DV: DV,
      NMPrimerNom: NMPrimerNom,
      NMSegundoNom: NMSegundoNom,
      APPaterno: APPaterno,
      APMaterno: APMaterno,
      CDTPProfesion: CDTPProfesion,
      CDEstadoCivil: CDEstadoCivil,
      sexo: sexo,
      cdnacionalidad: cdnacionalidad,
      rol: rol,
      rutingreso: rutingreso,
    });
  }

   /**
   * @param formContacto interfaces con los parametros que recibe la funciona para crear un nuevo contacto
   * @returns [] con los datos exito o error
   * @void //1 direccion postal 2 telefono 3 direccion
   */
   creacontacto(formContacto: FormContacto) {
    return this.http.post(`${this.URL}personas/CreaContacto`, { formContacto })
  }

  /**
   * @param CDTPContacto numerico representa al tpcontacto
   * @param CDContacto Identificador del contacto direccion, correo, telefono
   * @returns [] exito o error
   */
  updateContact(CDTPContacto: number, CDContacto: number) {
    return this.http.post(`${this.URL}personas/updateContact`, { CDTPContacto, CDContacto })
  }




}
