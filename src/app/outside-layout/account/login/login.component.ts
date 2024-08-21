import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { AccountService } from '../account.service';
import { AlertService } from '../../../Shared/alert.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { SharedService } from '../../../Shared/shared.service';
import { first } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  error: string = "";
  ngOnInit(): void {

    SharedService.logUser = undefined;
    this.authenticationService.logout()
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        SharedService.logUser = this.authenticationService.getLoggedUser();
      }
    });
    this.alertService.clear();

  }
  get logUser(): any {
    return SharedService.logUser;
  }


 
  constructor(
    private accountService: AccountService,
    private authenticationService: AuthenticationService,
    private alertService:AlertService,
    private router: Router) {
  
      this.loginForm = new FormGroup({
        phone: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)

  });
}


  loginUser(){

    const user = this.loginForm.value;
    this.accountService.loginUser(user).pipe(first()).subscribe({
			next: x => {
        
        
        
				if (x.result) {
					localStorage.setItem('access_token', x.result.token);
					if (this.accountService.isNavigatingToSuperUnit()) {
						this.router.navigate(["features/dashboard"]);
					} else {
						this.router.navigate(['/']);
					}
				} else {
					this.router.navigate(['/']);
					//this.alertService.error(x.message);
				}
			},
			error: err => {
				//this.alertService.error("Something wrong. Please try again later.");
			}
		});
	}
    



}
