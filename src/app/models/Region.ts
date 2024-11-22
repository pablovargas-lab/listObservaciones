export interface ResponseRegion {
    err:         boolean;
    status_code: number;
    message:     string;
    data:        Region[];
  }
  
  export interface Region {
    CDTPRegion:    number;
    GLTPRegion:    string;
    GLTPRegionNum: string;
  }
  