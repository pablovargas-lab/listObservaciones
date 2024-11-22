export interface ResponseEmail {
    err:         boolean;
    status_code: number;
    message:     string;
    data:        Email[];
  }
  
  export interface Email {
    NRRut:        number;
    Email:        string;
    CDContacto:   number;
    CDTPContacto: number;
    GLTPContacto: string;
  }
  