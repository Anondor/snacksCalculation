import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountRoutingModule } from './account-routing.module';
import { AuthenticationModule } from '../../authentication/authentication.module';
import { ReactiveFormsModule } from '@angular/forms';

export const AUTHENTICATION_CONFIG = {
  authEndpoint: "/users/authenticate",
  initialPage: "home"
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AccountRoutingModule,
   
  

  ]
})
export class AccountModule { }
