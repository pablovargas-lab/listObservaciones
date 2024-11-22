export interface ResponseSolRec {
    err: boolean;
    status_code: number;
    message: string;
    data: SolicitudRec[];
}

export interface SolicitudRec {

    caracterica: string;
    tipoB: boolean;
    nombre: string;
    pais: string;
    NumeroTRG: number;
    NRNave: number;
    nroomi: number;

}