export interface ResponseComuna {
    err:         boolean;
    status_code: number;
    message:     string;
    data:        Comuna[];
  }
  
  export interface Comuna {
    CDTPRegion: number;
    CDTPComuna: number;
    GLTPComuna: string;
  }
  