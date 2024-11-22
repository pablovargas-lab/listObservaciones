export interface ResponseTelefono {
    err:         boolean;
    status_code: number;
    message:     string;
    data:        Telefono[];
  }
  
  export interface Telefono {
    NRRut:        number;
    CDContacto:   number;
    CDTPContacto: number;
    GLTPContacto: string;
    CDTPTelefono: number;
    NRPais:       number;
    NRArea:       number;
    NRTelefono:   number;
    NRRutUsuario: number;
    FCExpiracion: null;
    GLTPTelefono: string;
  }
  