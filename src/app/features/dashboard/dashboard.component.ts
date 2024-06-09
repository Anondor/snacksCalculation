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
  constructor(private authenticationService:AuthenticationService,private router :Router){}
  ngOnInit(): void {
    this.authenticationService.getAllUser().subscribe(res=>{
      this.userList=res.result;
      console.log(this.userList)

      console.log(res);
    })
    
  }
  logout()
  {
    this.authenticationService.logout()
    
      window.location.href = '/';
    

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
