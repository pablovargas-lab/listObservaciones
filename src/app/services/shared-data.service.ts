import { EventEmitter, Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {

  public obsObt$: Subject<any> = new Subject()
  public idSolicitud$: Subject<number> = new Subject()
  obsObt2$ = new EventEmitter<any>()
  passSessionInf$ = new EventEmitter<any>()

  formControlChange = new EventEmitter<FormGroup>()
  dtOptions: DataTables.Settings = {}

  constructor() {

    this.dtOptions = {
      pagingType: 'full_numbers',
      responsive: true,
      paging: true,
      pageLength: 10,
      autoWidth: true,
      "lengthMenu": [[10, 25, 50, 100, 200, -1], [10, 25, 50, 100, 200, "All"]],
      //serverSide: true,
      searching: true,

      language: {
        processing: 'Procesando...', 
        search: 'Buscar:',
        lengthMenu: 'Mostrar _MENU_ elementos',
        info: 'Mostrando desde _START_ al _END_ de _TOTAL_ elementos',
        infoEmpty: 'Mostrando ningún elemento.',
        infoFiltered: '(filtrado _MAX_ elementos total)',
        infoPostFix: '',
        loadingRecords: 'Cargando registros...',
        zeroRecords: 'No se encontraron registros',
        emptyTable: 'No hay datos disponibles en la tabla',
        paginate: {
          first: 'Primero',
          previous: 'Anterior',
          next: 'Siguiente',
          last: 'Último',
        },
        aria: {
          sortAscending: ': Activar para ordenar la tabla en orden ascendente',
          sortDescending:
            ': Activar para ordenar la tabla en orden descendente',
        },
      },
    }
  }

}
