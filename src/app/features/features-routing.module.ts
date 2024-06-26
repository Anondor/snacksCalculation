import { NgModule } from '@angular/core';
import { AddMoneyComponent } from './add-money/add-money.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthenticationGuard } from '../authentication/guards/authentication.guard';
import { Routes, RouterModule } from '@angular/router';
import { RoleConstants } from '../authentication/models/user.model';
import { NewUserComponent } from './new-user/new-user.component';
import { GenerateReportComponent } from './generate-report/generate-report.component';

const routes: Routes = [
  
  {path:"dashboard",canActivate: [AuthenticationGuard],component:DashboardComponent},
  {path:"generate-report",canActivate: [AuthenticationGuard],component:GenerateReportComponent},
  {
    path: 'add-balance',component: AddMoneyComponent,canActivate: [AuthenticationGuard],
    data: { roles: [RoleConstants.SuperAdmin,RoleConstants.Admin] }
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
