import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TablaSolicitudesComponent } from './tabla-solicitudes/tabla-solicitudes.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomeMainComponent } from './home-main/home-main.component';
import { LoginComponent } from './auth/login/login.component';
import { NgxPopper } from 'angular-popper';
import { createPopper } from '@popperjs/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ModalObsComponent } from './modal-obs/modal-obs.component';
import { ModalManObsComponent } from './modal-man-obs/modal-man-obs.component';
import { MatTableExporterModule } from 'mat-table-exporter';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { NgxMatSelectSearchModule } from 'ngx-mat-select-search';
import { ErrorHandlerInterceptor } from './error-handler.interceptor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { DashboardComponent } from './dashboard/dashboard.component';




@NgModule({
    declarations: [
        AppComponent,
        FooterComponent,
        HeaderComponent,
        HomeMainComponent,
        TablaSolicitudesComponent,
        LoginComponent,
        ModalObsComponent,
        ModalManObsComponent,
        SidebarComponent,
        DashboardComponent,
    ],
    
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        RouterModule,
        NgbModule,
        DataTablesModule,
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        ModalModule.forRoot(),
        MatTableExporterModule,
        MatSidenavModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        NgxMatSelectSearchModule,
        NgIdleKeepaliveModule.forRoot()
    ],
    providers: [
        {
            provide: HTTP_INTERCEPTORS,
            useClass: ErrorHandlerInterceptor,
            multi:true,
        }
    ],
    bootstrap: [AppComponent],
})
export class AppModule { }
