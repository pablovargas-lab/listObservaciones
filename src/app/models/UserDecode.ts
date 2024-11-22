export interface UserDecode {
    iss?:         string;
    iat?:         number;
    exp?:         number;
    usr?:         string;
    rut?:         string;
    nom?:         string;
    mai?:         null;
    rep?:         string;
    rol?:         string;
    descripcion?: string;
    app?:         string;
    permisos?:    Permiso[];
  }
  
  export interface Permiso {
    codigo?:      string;
    descripcion?: string;
  }
  