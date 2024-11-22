import { Component, Input, OnInit, EventEmitter, ViewChild } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { SharedDataService } from '../services/shared-data.service';
import { ObservacionesService } from '../services/observaciones.service';
import { delay, finalize, retry, Subscription } from 'rxjs';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorIntl } from '@angular/material/paginator';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-obs',
  templateUrl: './modal-obs.component.html',
  styleUrls: ['./modal-obs.component.css']
})
export class ModalObsComponent implements OnInit {
  private paginator!: MatPaginator;
  private sort!: MatSort;

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  dataSource = new MatTableDataSource<any>();
  SegunTipo = true;
  row: any;
  folio: any;
  obsLst: any;
  tipe!: any;
  ofLabel: string = 'de';
  mostrarobexc: boolean = false;
  displayedColumns: string[] = ['RutUsuario', 'FechadeIngreso',
    'Observaciones'];

  constructor(
    public modalRef: BsModalRef,
    private _sharedDataService: SharedDataService,
    private obsService: ObservacionesService,
    private Matpaginator: MatPaginatorIntl,
    //private eventSubscription: Subscription

  ) {
    Matpaginator.itemsPerPageLabel = "Items por Página";
    Matpaginator.getRangeLabel = (
      page: number,
      pageSize: number,
      length: number,
    ): string => {
      if (length === 0 || pageSize === 0) {
        return `0 ${this.ofLabel} ${length}`;
      }
      length = Math.max(length, 0);
      const startIndex = page * pageSize;
      const endIndex =
        startIndex < length
          ? Math.min(startIndex + pageSize, length)
          : startIndex + pageSize;
      return `${startIndex + 1} - ${endIndex} ${this.ofLabel
        } ${length}`;
    };

  }
  ngAfterViewInit() {


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

          if (this.row.tipo == 1) {

            this.SegunTipo = true;

          } else if (this.row.tipo == 2) {

            this.SegunTipo = false;
          }

          this.folio = this.row.NroSolicitud;
          this.tipe = this.row.tipo;

          // console.log(this.folio);
          // console.log(this.tipe);

          this.obsService.obsSErv(this.folio, this.tipe).subscribe((obt: any) => {
            console.log(obt.err);
            // console.log(obt.data.recordset.length);
            if(obt.err == true){
              Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
            }else{
              this.obsLst = obt.data.recordset;
            this.dataSource.data = obt.data.recordset;

            if (this.obsLst.length == 0) {
              this.mostrarobexc = false;

            } else {
              this.mostrarobexc = true;
            }

            }
            
            // this.dataSource.sort = this.sort;

            //this.dataSource.paginator = this.paginator;

          }, (error) => {
            //(err, "response error")
            Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
  
        });
        },
        (error) => {
          Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
        }
      );
  }


  closeModal() {
    this.modalRef.hide();

  }

  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
