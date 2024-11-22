import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from '../environments/environment';
import { ResponseSolRec } from "../models/solicitudRec";
import { ResponseSolRep } from "../models/reporNaves";



//environment


@Injectable({
  providedIn: 'root'
})
export class NavesService {

  URL = environment.endpointURL;

  constructor(

    private http: HttpClient
  ) { }

  naves(
    caracterica: string,
    tipoB: number,
    nombre: string,
    nroomi: number
  ): Observable<ResponseSolRec>  {
    return this.http.post<ResponseSolRec>(`${this.URL}naves/naves/`, { caracterica:caracterica, tipoB:tipoB, nombre:nombre, nroomi:nroomi})
    .pipe(catchError(error =>{ return throwError(error);}));
  }

  SolicitudNaves(
    idnave: number,
    anno: number): Observable<ResponseSolRep> {
    return this.http.post<ResponseSolRep>(`${this.URL}naves/solicitudnave/`, { idnave: idnave, anno: anno })
    .pipe(catchError(error =>{ return throwError(error);}));
  }

}
