import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeMainComponent } from './home-main/home-main.component';

import { usuarioMaritimoGuard } from './guard/usuario-maritimo.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { authGuard } from './services/auth.guard';



export const routes: Routes = [

  // { path: 'home-main/:token', component: HomeMainComponent },
  { path: 'home-main', component: HomeMainComponent},
  {path: 'home-main/:token', component: HomeMainComponent},
  { path:'Dashboard', component: DashboardComponent,canActivate:[authGuard]},
  {path: '',redirectTo: '/home-main', pathMatch: 'full'},
  { path: '**', redirectTo: '/home-main', pathMatch: 'full' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],


  exports: [RouterModule]
})
export class AppRoutingModule { }
