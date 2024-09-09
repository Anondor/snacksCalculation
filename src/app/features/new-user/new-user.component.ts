import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';
import { AlertService } from '../../Shared/alert.service';

@Component({
  selector: 'app-new-user',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './new-user.component.html',
  styleUrl: './new-user.component.css'
})
export class NewUserComponent {
  signupForm:FormGroup ;
  userTypeData:any=[
    {id:1, type:"Admin"},
    { id:2, type:"User"}

  ]
   constructor(private router:Router,
    private authenticationService:AuthenticationService, 
    private alertService:AlertService,){ 
    this.signupForm = new FormGroup({
      //id:new FormControl(),
      name:new FormControl(null,Validators.required),
      email:new FormControl(null,[Validators.required,Validators.email]),
      phone:new FormControl(null,[Validators.required, Validators.pattern("[0-9 ]{11}")]),
      password:new FormControl(null,Validators.required),
      userType:new FormControl()

    }); 
    
   }
 
   ngOnInit(): void {

   }
   signupdata()
   {
     let user=this.signupForm.value;
  
     this.authenticationService.addUser(user).subscribe(res=>{
      if(res.isError==true)
      {
        this.alertService.alert("alert-error",res.message)
      }
      else{
        this.alertService.alert("alert-success","Successfully create a new user.")
        this.router.navigate(['features/dashboard']);

      }
      
        

     })
 
   }
  
  onReset(): void {
    this.signupForm.reset();
  }

}
