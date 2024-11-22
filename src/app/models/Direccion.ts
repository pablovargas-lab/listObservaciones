export interface ResponseDireccion {
    err:         boolean;
    status_code: number;
    message:     string;
    data:        Direccion[];
  }
  
  export interface Direccion {
    NRRut:        number;
    CDContacto:   number;
    CDTPContacto: number;
    GLTPContacto: string;
    NMCalle:      string;
    NRCalle:      string;
    NROfDepto?:    string;
    CDComuna:     number;
    CDPais:       string;
    GLTPComuna:   string;
  }
  