import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  
  descripcion!:any;
  rep!:any;

  constructor() { }

  ngOnInit(): void {
    this.descripcion  = sessionStorage.getItem('descripcion');
    this.rep = sessionStorage.getItem('rep');
  }

}
