
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  userList: any = []
  signupForm:FormGroup ;
  userTypeData:any=[
    {id:1, type:"Admin"},
    { id:2, type:"User"}

  ]
date: any;
   constructor(private router:Router,private authenticationService:AuthenticationService){ 
    this.signupForm = new FormGroup({
      //id:new FormControl(),
      userId:new FormControl(null,Validators.required),
      date:new FormControl(null,[Validators.required,Validators.email]),
      amount:new FormControl(null,[Validators.required])
    }); 
    
   }
 
   ngOnInit(): void {
    this.getAllUserList()

   }
   getAllUserList() {

    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;

      console.log(this.userList);
    })

  }
   signupdata()
   {
     let user=this.signupForm.value;
     this.authenticationService.addUser(user).subscribe(res=>{
        this.router.navigate(['features/dashboard']);

     })
 
   }
  
  onReset(): void {
    this.signupForm.reset();
  }

}
