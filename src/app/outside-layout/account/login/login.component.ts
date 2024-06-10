import { Component, Inject, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { AccountService } from '../account.service';
import { AlertService } from '../../../Shared/alert.service';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

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

  }

 
  constructor(
    private accountService: AccountService,
    private alertService:AlertService,
    private router: Router) {
  
      this.loginForm = new FormGroup({
        phone: new FormControl(null, Validators.required),
        password: new FormControl(null, Validators.required)

  });
}


  loginUser(){

    const user = this.loginForm.value;
    this.accountService.loginUser(user).subscribe({
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
					this.alertService.tosterDanger(x.message);
				}
			},
			error: err => {
				this.alertService.tosterDanger("Something wrong. Please try again later.");
			}
		});
	}
    



}
