import { Component } from '@angular/core';
import { AuthenticationService } from '../../authentication/authentication.service';
import { Router } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.css',
    imports: [HeaderComponent]
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
    this.router.navigate(["features/home"])
  }
  getLoggedUser()
  {
    let user=this.authenticationService.getLoggedUser()
    console.log(user);

  }

}
