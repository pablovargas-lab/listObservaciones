export interface ResponseSolRep {
    err: boolean;
    status_code: number;
    message: string;
    data: reporNaves[];
}

export interface reporNaves {

   idnave: number;
   anno: number;
   NroSolicitud: number;
   fecha: Date;
   TipoSolicitud: string;
   PuertoSolicitud: string;
   PuertoOrigen: string;
   PuertoDestino: string;
   EStado: string;
   fh_solicitada: Date;
   tipo: string;
   monto: any;

}