import { Component } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ObservacionesService } from '../services/observaciones.service';
import { SharedDataService } from '../services/shared-data.service';
import { delay, retry } from 'rxjs';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-modal-man-obs',
  templateUrl: './modal-man-obs.component.html',
  styleUrls: ['./modal-man-obs.component.css']
})
export class ModalManObsComponent {



  ingObs: string = '';
  rowObs: any;
  row: any;
  folio: any;
  tipe!: number;
  obsLst: any;
  dataSource: any;
  rut: any;
  SegunTipo = true;


 
  constructor(

    public modalRef: BsModalRef,
    private _sharedDataService: SharedDataService,
    private obsService: ObservacionesService,

  ) {


  }


  ngOnInit(): void {

    this._sharedDataService.obsObt2$
      .pipe(

        retry(10),

        delay(0),
      )
      .subscribe(
        (resp) => {
          this.row = resp;
          // console.log(this.row.NroSolicitud);
          // console.log(this.row.tipo);

          this.folio = this.row.NroSolicitud;
          this.tipe = parseInt(this.row.tipo);

          if (this.row.tipo == 1) {

            this.SegunTipo = true;

          } else if (this.row.tipo == 2) {

            this.SegunTipo = false;
          }

          // console.log(this.folio);
          // console.log(this.tipe);

          this.obsService.obsSErv(this.folio, this.tipe).subscribe((obt: any) => {
            // console.log(obt.data.recordset);
            // console.log(obt.data.recordset.length);
            if(obt.err == true){
              Swal.fire('Favor inténtelo más tarde o contáctese con el Administrado de la Aplicación');
            }else{
              this.obsLst = obt.data.recordset;
            }
            

          }, (error) => {
            //(err, "response error")
            Swal.fire('Favor inténtelo más tarde o contáctese con el Administrado de la Aplicación');
  
        });
        },
        (error) => {
          //console.log('error arreglo traido');
          Swal.fire('Favor inténtelo más tarde o contáctese con el Administrado de la Aplicación');
        }
      );

    this.rut = sessionStorage.getItem('usr');


  }

  enviarObs() {

    if (this.ingObs === '') {
      //console.log('El campo de texto está vacío');
      return;
    } else {
      this.modalRef.hide();
      //console.log('obs ingresado:', this.ingObs);
      let GlObservacion = this.ingObs;
      //const serializedfolio = BigInt(this.row.NroSolicitud);
      let folio: string;
      folio = this.row.NroSolicitud;
      //const folio = JSON.stringify({ value: serializedfolio.toString() });

      //const folio= 6391020n;
      const nrrutusuario = parseInt(this.rut);
      let tipo = parseInt(this.row.tipo);

      // console.log(GlObservacion)
      // console.log(typeof (GlObservacion))
      // console.log(folio)
      // console.log(typeof (folio))
      //console.log(typeof (serializedfolio))
      // console.log(nrrutusuario)
      // console.log(typeof (nrrutusuario))
      // console.log(tipo)
      // console.log(typeof (this.row.tipo))

      if (tipo == 1) {
        //this.obsService.obsSend(folio,tipo,GlObservacion,nrrutusuario)
        this.obsService.obsSendT1(folio, tipo, GlObservacion, nrrutusuario).subscribe((res: any) => {
          //console.log(res.err);
        
          if(res.err == true){
            Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
          }else{
            Swal.fire('Observación ingresada correctamente');
          }
          

          //console.log('obs ingresado tipo 1');

        }, (error) => {
          //(err, "response error")
          Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');

      })
      } else {
        if (tipo == 2) {
          this.obsService.obsSendT2(folio, tipo, GlObservacion, nrrutusuario).subscribe((res: any) => {
            //console.log(res);
            if(res.err == true){
              Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
            }else{
              Swal.fire('Observación ingresada correctamente');
            }
            //console.log('obs ingresado tipo 2');

          }, (error) => {
            //(err, "response error")
            Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
  
        })
        }


      }



    }//end if vacio

  }//end enviar obs
  closeModal() {
    this.modalRef.hide();

  }


}
