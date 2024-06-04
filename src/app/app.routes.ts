import { Routes } from '@angular/router';
import { AuthenticationGuard } from './authentication/guards/authentication.guard';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },

    { path: 'demo', canActivate: [AuthenticationGuard], loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
   { path: 'account',loadChildren: () => import('./outside-layout/account/account.module').then(m => m.AccountModule)},
];
