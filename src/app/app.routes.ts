import { Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';

export const routes: Routes = [
    { path: 'demo', canActivate: [AuthenticationGuard], loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
   { path: '',loadChildren: () => import('./outside-layout/account/account.module').then(m => m.AccountModule)},
];
