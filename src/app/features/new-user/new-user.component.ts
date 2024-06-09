import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  signupForm:FormGroup ;
   constructor(private router:Router,private authenticationService:AuthenticationService){ 
    this.signupForm = new FormGroup({
      id:new FormControl(),
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      phone:new FormControl(null,[Validators.required]),
      password:new FormControl(null,Validators.required),
      isAdmin:new FormControl()

    }); 
    
   }
 
   ngOnInit(): void {

   }
   signupdata()
   {
     let user=this.signupForm.value;
     this.authenticationService.addUser(user).subscribe(res=>{
        this.router.navigate(['features/dashboard']);

     })
 
   }

}
