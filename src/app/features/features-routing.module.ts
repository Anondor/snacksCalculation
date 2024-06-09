import { NgModule } from '@angular/core';
//import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { Routes, RouterModule } from '@angular/router';
import { RoleConstants } from '../authentication/models/user.model';
import { NewUserComponent } from './new-user/new-user.component';

const routes: Routes = [
  
  {path:"dashboard",canActivate: [AuthenticationGuard],component:DashboardComponent},
  {
    path: 'admin',component: HomeComponent,canActivate: [AuthenticationGuard],
    data: { roles: [RoleConstants.SuperAdmin] }
},
{
  path: 'add-new-user',component: NewUserComponent,canActivate: [AuthenticationGuard],
  data: { roles: [RoleConstants.SuperAdmin] }
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
