import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../authentication/authentication.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { first } from 'rxjs';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm!: FormGroup;
  error: string = "";
  ngOnInit(): void {
    this.loginForm = new FormGroup({
      phone: new FormControl("string", Validators.required),
      password: new FormControl("string", Validators.required)
});
  }

 
  constructor(
    private accountService: AccountService,
    private router: Router) {
  
      this.loginForm = new FormGroup({
        phone: new FormControl("string", Validators.required),
        password: new FormControl("string", Validators.required)
  });
}


  loginUser(){

    const user = this.loginForm.value;
    console.log(user)
    this.accountService.loginUser(user).subscribe(
      data => {
          //this.router.navigate([this.config.initialPage]);
      },
      error => {
          this.error = error;
      });
    }
    



}
