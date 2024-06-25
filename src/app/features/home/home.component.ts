
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
maxDate?:string;
  userList: any = []
  amountForm:FormGroup ;

date: any;
   constructor(private router:Router,private authenticationService:AuthenticationService){ 
    this.amountForm = new FormGroup({
      //id:new FormControl(),
      userId:new FormControl(null,Validators.required),
      date:new FormControl(null,[Validators.required,Validators.email]),
      amount:new FormControl(null,[Validators.required])
    }); 
    
   }
 
   ngOnInit(): void {
    const today=new Date();
    this.maxDate=today.toISOString().split('T')[0];
    this.getAllUserList()

   }
   getAllUserList() {

    this.authenticationService.getAllUser().subscribe(res => {
      this.userList = res.result;

      console.log(this.userList);
    })

  }
   saveAmountData()
   {
     let user=this.amountForm.value;

     
     this.authenticationService.addUserAmount(user).subscribe(res=>{
        this.router.navigate(['features/dashboard']);

     })
 
   }
  
  onReset(): void {
    this.amountForm.reset();
  }

}
