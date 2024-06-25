import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { tokenGetter } from '../../app.config';
import { AuthenticationService } from '../../authentication/authentication.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router:Router, private authenticationService:AuthenticationService,)
  {

  }

  goToDashboard()
  {
		this.router.navigate(["features/dashboard"]);
  }
  goToHome()
  {
    this.router.navigate(["features/add-balance"]);
  }
  addNewUser()
  {
    this.router.navigate(["features/add-new-user"])
  }
  generateReport()
  {
    this.router.navigate(["features/generate-report"])
  }
  logout()
  {
    this.authenticationService.logout()    
  }
  
}
