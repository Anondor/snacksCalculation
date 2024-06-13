import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { HeaderComponent } from "../header/header.component";
import { Router } from '@angular/router';

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
  constructor(private authenticationService:AuthenticationService,private router :Router){
 


  }
 
  ngOnInit(): void {
    this.getTodaysDate();
    this.authenticationService.getLoggedUser();
    this.authenticationService.getAllUser().subscribe(res=>{
      this.userList=res.result;

    })

  
    
  }
  getTodaysDate()
  {
    let day=new Date().getDate().toString()
    let month=new Date().getMonth().toString()
    let year=new Date().getFullYear().toString();
    if(day.length==1)day='0'+day;
    if(month.length==1)month='0'+month;
    this.todaysDate=year.toString()+'-'+month.toString()+'-'+day.toString()
    this.firstDayOfMonth=year.toString()+'-'+month.toString()+'-'+'01';
    console.log(this.todaysDate,this.firstDayOfMonth)
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
