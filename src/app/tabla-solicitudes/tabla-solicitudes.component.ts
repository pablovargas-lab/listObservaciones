import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Subject, debounceTime, filter, map, takeUntil, tap } from 'rxjs';
import { SharedDataService } from '../services/shared-data.service';
import { NavesService } from '../services/naves.service';
import { Router } from '@angular/router';
import { NgSelectConfig } from '@ng-select/ng-select';
import { DataTableDirective } from 'angular-datatables';
import Swal from 'sweetalert2';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ObservacionesService } from '../services/observaciones.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { data } from 'jquery';
import { BsModalService, BsModalRef, ModalOptions } from 'ngx-bootstrap/modal';
import { ModalObsComponent } from '../modal-obs/modal-obs.component';
import { ModalManObsComponent } from '../modal-man-obs/modal-man-obs.component';
import jspdf, { jsPDF } from 'jspdf';
import html2canvas from 'html2canvas';
import 'jspdf-autotable';
import autoTable from 'jspdf-autotable';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatSelectFilterModule } from 'mat-select-filter';
import { eventListeners } from '@popperjs/core';






@Component({
  selector: 'app-tabla-solicitudes',
  templateUrl: './tabla-solicitudes.component.html',
  styleUrls: ['./tabla-solicitudes.component.css']
})
export class TablaSolicitudesComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild('numeroInput', { static: true }) numeroInput!: ElementRef;
  @ViewChild('dropdown') dropdown: any;
  //@Output() arregloEmitido = new EventEmitter<any[]>();
  private paginator!: MatPaginator;
  private sort!: MatSort;
  caracTxt: any;
  mostrarDiv: boolean = true;


  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }

  modalRef!: BsModalRef;

  Form!: FormGroup;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  displayedColumns: string[] = ['NroSolicitud', 'fecha', 'tipo Solicitud', 'monto',
    'puerto Solicitud', 'puerto/país origen', 'puerto/país destino', 'estado', 'observaciones'];


  closeResult = '';
  bodyModal: any;


  dataSource = new MatTableDataSource<any>();
  solicitudes: any[] = [];
  foliolist: any[] = [];
  //FormularioInput!: FormGroup;
  //dtTrigger: any = new Subject();
  solicitudesAll: any[] = [];
  PrevInfoArr: any[] = [];
  yearselect!: any;
  obsLst: any[] = [];
  NomLst: any[] = [];
  NomLst2: any[] = [];
  selectedItem: string = '';
  ItemSelected: any;
  caracterica: any;
  nroomi: any;
  nombre: any;
  nombre2: any;
  caracCapturada: any;
  caracrad!: string;
  nomrad!: string;
  tipodos!: any;
  omirad!: string;
  optionSelect: any;
  selectedRow: any = null;
  years: number[] = [];
  loading!: boolean;
  loading2!: boolean;
  loadingY!: boolean;
  mostrar: boolean = false;
  mostrarP: boolean = false;
  mostrarmsn: boolean = false;
  mostrarbotex: boolean = false;
  mostrarTabReporter: boolean = false;
  formularioEnviado: boolean = false;
  tipoB!: number;
  tipoUsuario!: number;
  IDPersona!: string | null;
  radioSeleccionado: any;
  mostrarAlerta: boolean = false;
  ofLabel: string = 'de';
  txtNom: any;
  dropdownValue: string = 'default';


  //dtElement: DataTableDirective;

  //navesForm = new FormControl('',[Validators.required]);

  constructor(


    private _sharedDataService: SharedDataService,
    protected sanitizer: DomSanitizer,
    private router: Router,
    private config: NgSelectConfig,
    private formBuilder: FormBuilder,
    private servicioNav: NavesService,
    private modalService: BsModalService,
    private Matpaginator: MatPaginatorIntl,

    //private modalService: NgbModal,
    private obsService: ObservacionesService,


  ) {

    const currentYear = new Date().getFullYear();
    for (let year = 1990; year <= currentYear; year++) {
      this.years.push(year);
    }

    this.config.notFoundText = 'Elemento no encontrado'

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

  ngOnInit(): void {

    this.tipoUsuario = parseInt(sessionStorage.getItem('tipoUsuario') || "[]");
    this.IDPersona = sessionStorage.getItem('IDPersona');


    this.Form = this.formBuilder.group({
      option: [''],
      navesForm: [{ value: '', disabled: true }],
      nombre: [{ value: '', disabled: true }],
      omiimp: [{ value: '', disabled: true }],


    });

    var element = document.getElementById("nomsel") as HTMLSelectElement;
    // if (element!.disabled) element!.removeAttribute("disabled");
    // else element!.setAttribute("disabled","");

    this.Form.get('option')!.valueChanges.subscribe(value => {
      if (value === 'caracrad') {
        this.Form.get('navesForm')!.enable();
        this.Form.get('nombre')!.disable();
        this.Form.get('omiimp')!.disable();
        this.Form.get('nombre')!.setValue('');
        this.Form.get('omiimp')!.setValue('');
        element!.setAttribute("disabled", "true");
        this.mostrar = false;
        this.mostrarTabReporter = false;
        this.dataSource.data = [];
        this.mostrarbotex = false;
        this.mostrarmsn=false;
        this.mostrarP=false;

      } else if (value === 'nomrad') {
        this.Form.get('navesForm')!.disable();
        this.Form.get('navesForm')!.setValue('');
        this.Form.get('nombre')!.enable();
        this.Form.get('omiimp')!.disable();
        this.Form.get('omiimp')!.setValue('');
        element!.removeAttribute("disabled");
        this.mostrarmsn=true;
        this.mostrar = false;
        this.mostrarP=false;
        this.mostrarTabReporter = false;
        this.dataSource.data = [];
        this.mostrarbotex = false;
      } else if (value === 'omirad') {
        this.Form.get('navesForm')!.disable();
        this.Form.get('nombre')!.disable();
        this.Form.get('navesForm')!.setValue('');
        this.Form.get('nombre')!.setValue('');
        this.Form.get('omiimp')!.enable();
        element!.setAttribute("disabled", "true");
        this.mostrarmsn=false;
        this.mostrar = false;
        this.mostrarP=false;
        this.mostrarTabReporter = false;
        this.dataSource.data = [];
        this.mostrarbotex = false;
      }
    });

    //console.log(this.Form.get('option')!.value);
  }

  ngAfterViewInit(): void {

    const input = this.numeroInput.nativeElement as HTMLInputElement;

    input.addEventListener('paste', this.bloquearCopiarPegar.bind(this));

  }

  ngOnDestroy(): void { }

  PrevInfo() {

    if (this.radioSeleccionado == null) {
      //console.log("sin opcion elegida");
      Swal.fire('Debe seleccionar una opción.');
      this.mostrarTabReporter = false;

    } else {
      //console.log("con opcion elegida");


      //info naves
      // console.log(this.Form.get('navesForm')!.value);
      // console.log(this.Form.get('nombre')!.value);
      // console.log(this.Form.get('omiimp')!.value);

      this.caracterica = this.Form.get('navesForm')!.value;
      //console.log(caracterica)
      this.nombre = this.Form.get('nombre')!.value;

      this.nroomi = this.Form.get('omiimp')!.value;

      // console.log(this.caracterica);
      // console.log(this.nombre);
      // console.log(this.nroomi);


      if (this.Form.get('nombre')!.valid === true) {

        this.tipoB = 1;
        //console.log('entra nombre');
        this.caracterica = this.selectedItem;


      } else if (this.Form.get('navesForm')!.valid === true) {

        this.tipoB = 1;

        //console.log(' entra info');

      } else if (this.Form.get('omiimp')!.valid === true) {

        this.tipoB = 2;
        //console.log(' entra omiimp');

      } else {

        //console.log('error');
        Swal.fire('Ninguna opción seleccionada');

      }

      if ((this.nombre == null || this.nombre == '' || this.nombre.trim() == '') && (this.nroomi == null ||
        this.nroomi == '') && (this.caracterica == null || this.caracterica == '' || this.caracterica.trim() == '')) {
        //console.log("campos vacios")
        if (this.Form.get('option')!.value == 'caracrad') {
          Swal.fire('Debe ingresar la característica de la nave ');
          this.mostrarTabReporter = false;


        } else if (this.Form.get('option')!.value == 'nomrad') {

          Swal.fire('Debe ingresar el nombre de la nave');
          this.mostrarTabReporter = false;

        } else if (this.Form.get('option')!.value == 'omirad') {

          Swal.fire('Debe ingresar el número OMI de la nave ');
          this.mostrarTabReporter = false;
        }

      } else {
        this.CirCarga();


        //console.log("campos no vacios");
        var asdqasd = document.getElementById('nomsel') as HTMLSelectElement
        //console.log(asdqasd.value);

        if (asdqasd.value == null || asdqasd.value == '' && this.Form.get('option')!.value == 'nomrad') {

          Swal.fire('Debe seleccionar una nave primero');


          this.loading = false;
          //  //("Ninguna opción seleccionada");

        } else {
          if (this.selectedItem == 'default' && (this.Form.get('nombre')!.value == '' || this.Form.get('nombre')!.value == null)) {

            Swal.fire('Debe ingresar el nombre de la nave');

          } else {

            if ((this.Form.get('nombre')!.value !== '' || this.Form.get('nombre')!.value !== null) && this.selectedItem == 'default') {

              Swal.fire('Debe seleccionar una nave');

            }else{

             //(this.Form.get('option')!.value);
             this.servicioNav.naves(this.caracterica, this.tipoB, this.nombre, this.nroomi).subscribe((resp: any) => {

              console.log(resp.err);
              if (resp.err == true) {
                Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
              } else {
                this.solicitudes = resp.data.recordset;
                this.PrevInfoArr = this.solicitudes;

                console.log(this.PrevInfoArr[0]);

                if (this.solicitudes.length === 0 || this.solicitudes === null) {


                  this.loading = false;
                  // Swal.fire('no existe nave buscada');
                  Swal
                    .fire({
                      title: "",
                      text: "No existe nave",
                      icon: 'warning',
                      confirmButtonText: "Aceptar",
                    })
                    .then(resultado => {
                      if (resultado.value) {
                        // Hicieron click en "Sí"
                        //("si");
                        this.mostrar = false;
                        

                      } else {
                        // Dijeron que no
                        //("NO");
                      }
                    });

                } else {



                  this.mostrarBoton();
                  this.mostrarSelect();//select año



                  this.loading = false;
                }
              }



              this.loading = false;


             }, error => {
               Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
             }
             );
            }
          }
        }


      }
    }
  }

  BuscarxNom(event: KeyboardEvent): void {
    this.nombre='';
    this.nombre2='';
    this.dataSource.data=[];
 

    this.nombre = this.Form.get('nombre')!.value;
    this.nombre2 = this.nombre.trimStart();
    //(this.Form.get('nombre')!.value);
    //(this.nombre2);
    if (this.nombre2.trim() !== '') {

      if (this.nombre.length >= 3) {

        this.servicioNav.naves('', 0, this.nombre2, 0).subscribe((resp: any) => {

          if (resp.err == true) {
            Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
          } else {
            this.NomLst = resp.data.recordset;
            console.log(this.NomLst);
            console.log(this.nombre);
            console.log(this.nombre2)
          }



          //(this.NomLst);


        }, (err) => {
          //(err, "response error")
          Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');

        }
        )
      } else if (this.nombre.length < 3) {

        console.log(this.nombre);
        console.log(this.nombre2)
        console.log(this.NomLst);
        this.NomLst=[];
        this.nombre2='';
        this.nombre='';
        this.dataSource.data=[];
        //("muy corto")

      }

    } else {

      this.NomLst=[];
      //('tiene espacios');
    }

  }



  capturarCArac(e: any): void {

    //("cambio");

    //('Selected Item:', this.selectedItem);
    this.mostrar=false;


    if (this.selectedItem == null || this.selectedItem == '') {

      //('campo vacio');
      this.NomLst = [];


    } else if (this.selectedItem.length < 2) {
      this.NomLst = [];
      //("muy corto")
    } else if (this.selectedItem.length >= 2) {

      //this.selectedItem


    }

    // var sel = document.getElementById("nomlist2") as HTMLSelectElement;
    // var text2 = sel.options[sel.selectedIndex].text;

    //  let miSelect = document.getElementById('nomlist') as HTMLSelectElement;
    // miSelect.addEventListener('change', () => {
    // Obtiene el valor de la opción seleccionada
    // const opcionSeleccionada = miSelect.value;

    // Haz lo que quieras con el valor seleccionado, por ejemplo, muestra en la consola
    // console.log(`Opción seleccionada: ${opcionSeleccionada}`);
    // });

  }

  limpiaSelect() {

    if (this.NomLst !== null) {

      this.NomLst = [];
    }

    this.caracterica = '';
    this.selectedItem = '';
  }


  setDataSourceAttributes() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  missolicitudesXcaract() {


    //llena tabla
    this.CirCarga2();
    this.circargaY();
    //(this.Form.get('navesForm')?.value);
    //(this.Form.get('nombre')?.value);
    //(this.Form.get('omiimp')?.value);

    let caracterica = this.Form.get('navesForm')!.value;
    //  //(caracterica)
    let nombre = this.Form.get('nombre')!.value;
    let nroomi = this.Form.get('omiimp')!.value;

    if (this.Form.get('nombre')!.valid === true) {

      this.tipoB = 1;
      //('1');
      // this.caracterica = this.selectedItem; 

    } else if (this.Form.get('navesForm')!.valid === true) {

      this.tipoB = 1;
      //(' 1');
    } else if (this.Form.get('omiimp')!.valid === true) {

      this.tipoB = 2;
      //(' 2');

    } else {

      //('error');
      Swal.fire('Ninguna opcion seleccionada');
    }

    //(this.tipoB);

    this.servicioNav.naves(caracterica, this.tipoB, nombre, nroomi).subscribe((resp: any) => {
   
      if (resp.err == true) {
        Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
      } else {

        let anno = this.yearselect;
        let idnave = this.solicitudes[0].NRNave;

        this.servicioNav.SolicitudNaves(idnave, anno).subscribe((obt: any) => {

          if (obt.err == true) {
            Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
          } else {


            if (anno == null) {
              //("sin año seleccionado")
              Swal.fire('Debe seleccionar el año a consultar');
            } else {
              if (this.solicitudes[0].NRNave !== null || this.solicitudes.length !== 0) {



                //(anno);
                //(idnave);

                //(obt.data);

                this.solicitudesAll = obt.data;

                if (this.solicitudesAll.length == 0) {

                  Swal.fire('No existen registros para este año');
                  this.loadingY = false;
                  this.loading2 = false;
                  this.dataSource.data = [];
                  this.mostrarDiv = true;
                  this.mostrarbotex = false;
                  this.mostrarTabReporter = false;
                } else {
                  this.mostrarDiv = false;
                  this.tipodos = obt.tipo
                  this.dataSource.data = obt.data;
                  this.mostrarTabReporter = true;
                  //(this.solicitudesAll[0].NroSolicitud);
                  //('entra');
                  //(this.solicitudesAll.length);
                  this.loading2 = false;
                  this.loadingY = false;
                  this.mostrarbotex = true;


                }
              } else {
                //('campo vacio')
                this.loading2 = false;
                this.loadingY = false;




              }
            }

          }
          this.loading2 = false;
          this.loadingY = false;
        }, (err) => {
          //(err, "response error")
          Swal.fire('Favor inténtelo más tarde o contáctese con el Administrado de la Aplicación');

        });

      }
    }, (err) => {
      //(err, "response error")
      Swal.fire('Favor inténtelo más tarde o contáctese con el Administrador de la Aplicación');
    });

  }

  mostrarBoton(): void {
    this.mostrar = true;
  }
  mostrarSelect(): void {
    this.mostrar = true;
  }
  CirCarga(): void {
    this.loading = true;
  }
  CirCarga2(): void {
    this.loading2 = true;
  }

  circargaY(): void {
    this.loadingY = true;
  }

  toggleDivtableInfo() {
    // this.mostrarTabReporter = !this.mostrarTabReporter;
    // if (this.mostrarTabReporter == false) {
    //   this.mostrarTabReporter = true;

    // }else if(this.mostrarTabReporter == true) {
    //   this.dataSource.data = [];

    // }
    this.mostrarTabReporter = false;
    this.dataSource.data = [];

  }
  getColor(row: any): string {
    return row.tipo === 2 ? '#A7D0F5' : 'white'; // Cambiar 'green' y 'red' por los colores deseados
  }

  generatePDF() {

    if (this.solicitudesAll.length == 0 || this.solicitudesAll.length == null) {
      //("no crea pdf");

    } else {
      const data = document.getElementById('tablaSol');

      html2canvas(data!).then(canvas => {

        var pdf = new jspdf('p', 'mm', 'letter');
        //autoTable(pdf, {html:'#tablaSol'})
        const width = pdf.internal.pageSize.getWidth();
        const height = pdf.internal.pageSize.getHeight();
        //var hratio;
        //var height2=width*hratio!;
        var imgData = canvas.toDataURL("image/png");

        pdf.addImage(imgData, 'PNG', width * .060, 20, width * .90, height * .60);
        pdf.save('tabla.pdf');
      });

    }



  }




  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  openModal(row: any) {

    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(ModalObsComponent, config);
    //this._sharedDataService.obsObt$.next(row);
    this._sharedDataService.obsObt2$.emit(row);

  }

  openModalManObs(row: any) {

    const config: ModalOptions = { class: 'modal-lg' };
    this.modalRef = this.modalService.show(ModalManObsComponent, config);
    //this._sharedDataService.obsObt$.next(row);
    this._sharedDataService.obsObt2$.emit(row);

  }

  validarNumero(event: KeyboardEvent): void {
    const input = this.numeroInput.nativeElement as HTMLInputElement;
    const keyCode = event.keyCode;
    // Permitir las teclas de navegación y eliminación
    if ([46, 8, 9, 27, 13, 110, 190].indexOf(keyCode) !== -1 ||
      // Permitir: Ctrl+A
      (keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: Ctrl+C
      (keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: Ctrl+X
      (keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: Ctrl+V
      (keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
      // Permitir: home, end, left, right
      (keyCode >= 35 && keyCode <= 39)) {
      // No hacer nada
      return;
    }

    // Asegurarse de que solo se ingresen números
    if ((event.shiftKey || (keyCode < 48 || keyCode > 57)) &&
      (keyCode < 96 || keyCode > 105)) {
      event.preventDefault();
    }
  }

  bloquearCopiarPegar(event: ClipboardEvent): void {
    event.preventDefault();
  }

  onGroupSelectChange() {
    this.yearselect = 'default';


  }

  limpiarNom(inputField: HTMLInputElement) {

    this.PrevInfoArr = [];
    this.NomLst = [];
    this.mostrar = false;
    inputField.value = '';
    this.selectedItem = "default";
    this.mostrarTabReporter = false;
    this.dataSource.data = [];
    this.nombre2='';
    this.nombre = '';
  }

  limpiarOMI(inputField: HTMLInputElement){

    this.mostrar = false;
    this.PrevInfoArr = [];
    this.mostrarTabReporter = false;
    this.dataSource.data = [];
    inputField.value = '';


  }

  limpiarCar(inputField: HTMLInputElement){

    this.mostrar = false;
    this.PrevInfoArr = [];
    this.mostrarTabReporter = false;
    this.dataSource.data = [];
    inputField.value = '';




  }



  selectRow(row: any) {
    this.mostrarP=true;
    this.selectedRow = row;
  }

  selectNav(){

    this.mostrar = false;
  }

}