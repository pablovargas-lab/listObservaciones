export interface ResponseSolmain {
    err: boolean;
    status_code: number;
    message: string;
    data: solmain[];
}

export interface solmain {

   idnave: number;
   anno: number;
   NroSolicitud: number;
   Fecha: Date;
   TipoSolicitud: string;
   PuertoSolicitud: string;
   PuertoOrigen: string;
   PuertoDestino: string;
   Estado: string;
   fh_solicitada: Date;
   tipo: string;
   caracterica: string;
   tipoB: number;
   nombre: string;
   pais: string;
   NumeroTRG: number;
   NRNave: number;
   nroomi: number;

}