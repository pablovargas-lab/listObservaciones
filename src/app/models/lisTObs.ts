export interface ResponselistObs {
    err: boolean;
    status_code: number;
    message: string;
    data: listaObs[];
}

export interface listaObs {

    NrfolioOOII: number;
    FCIngreso: Date;
    NRRutUsuario: number;
    DVerificador: string;
    Nombre: string;
    GLObservacion: string;
    tipo: number;


}