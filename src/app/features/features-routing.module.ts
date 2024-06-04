import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:"home",canActivate: [AuthenticationGuard], component:HomeComponent},
  {path:"dashboard",canActivate: [AuthenticationGuard],component:DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
