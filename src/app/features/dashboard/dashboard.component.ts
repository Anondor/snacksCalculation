import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  constructor(private authenticationService:AuthenticationService,private router :Router){}
  logout()
  {
    this.authenticationService.logout()
    
      window.location.href = '/';
    

  }
  home()
  {
    this.router.navigate(["demo/home"])
  }
  getLoggedUser()
  {
    let user=this.authenticationService.getLoggedUser()
    console.log(user);

  }

}
