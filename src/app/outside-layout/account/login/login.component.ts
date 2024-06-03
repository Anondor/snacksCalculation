import { Component } from '@angular/core';
import { AccountService } from '../account.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private accountService:AccountService)
  {

  }

  login()
  {
    let model=
    {
      phone:"string",
      password:"string"
    }
    this.accountService.loginUser(model).subscribe(res=>{
      console.log(res.value);
      
    })
  
  }

}
