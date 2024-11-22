import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { ResponselistObs } from '../models/lisTObs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ObservacionesService {

  URL = environment.endpointURL;

  constructor(

    private http: HttpClient
  ) { }

  obsSErv(
    //leer obs
    folio: number,
    tipo: number
  ): Observable<ResponselistObs> {
    return this.http.post<ResponselistObs>(`${this.URL}observaciones/observaciones`,
      { folio: folio, tipo: tipo }).pipe(catchError(err => { return throwError(err); }));
  }

  obsSendT1(

    folio: string,
    tipo: number,
    GlObservacion: string,
    nrrutusuario: number
  ): Observable<any> {
    return this.http.post<any>(`${this.URL}observaciones/postObsT1/`,
      { folio: folio, GlObservacion: GlObservacion, nrrutusuario: nrrutusuario, tipo: tipo })
      .pipe(catchError(error =>{ return throwError(error);}));

  }

  obsSendT2(

    folio: string,
    tipo: number,
    GlObservacion: string,
    nrrutusuario: number
  ): Observable<any> {
    return this.http.post<any>(`${this.URL}observaciones/postObsT2/`,
      { folio: folio, GlObservacion: GlObservacion, nrrutusuario: nrrutusuario, tipo: tipo })
      .pipe(catchError(error =>{ return throwError(error);}));

  }

}
