import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },

   // { path: '', canActivate: [AuthGuard], loadChildren: () => import('./features/features.module').then(m => m.FeaturesModule) },
   { path: 'account',loadChildren: () => import('./outside-layout/account/account.module').then(m => m.AccountModule)},
];
