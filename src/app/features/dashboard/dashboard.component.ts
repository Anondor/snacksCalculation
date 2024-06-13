import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';
import { FormTexts } from '../../authentication/models/user.model';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [HeaderComponent]
})
export class DashboardComponent implements OnInit{
  userList:any=[]
  user:any;
  todaysDate:string=''
  firstDayOfMonth:string='';
  maptest: { [key: string]: { [key: string]: string } } = {};

  
  monthlyUserData:any
  constructor(private authenticationService:AuthenticationService,private router :Router){
 


  }
 
  ngOnInit(): void {
    this.getTodaysDate();
    this.authenticationService.getLoggedUser();
    this.authenticationService.getAllUser().subscribe(res=>{
      this.userList=res.result;
      this.setValue(this.firstDayOfMonth, '2', this.userList);

    })
    

  
    
  }
  getTodaysDate()
  {
    let day=new Date().getDate().toString()
    let month=(new Date().getMonth()+1).toString()
    let year=new Date().getFullYear().toString();
    if(day.length==1)day='0'+day;
    if(month.length==1)month='0'+month;
    this.todaysDate=year.toString()+'-'+month.toString()+'-'+day.toString()
    this.firstDayOfMonth=year.toString()+'-'+month.toString()+'-'+'01';
   this.authenticationService.getMonthlyCost(this.firstDayOfMonth,this.todaysDate).subscribe(res=>
    {
       this.monthlyUserData=res.result;
    }
   )
 
  }
  setValue(firstDayOfMonth: string, key: string, value: any): void {
    if (!this.maptest[firstDayOfMonth]) {
      this.maptest[firstDayOfMonth] = {};
    }
    this.maptest[firstDayOfMonth][key] = value;
    console.log(this.maptest[firstDayOfMonth][key])
  }
  logout()
  {
    this.authenticationService.logout()
    
     // window.location.href = '/';
     this.router.navigate([""]);
    

  }
  home()
  {
    this.router.navigate(["features/admin"])
  }
  getLoggedUser()
  {
  
    this.user=this.authenticationService.getLoggedUser()

  }
}
