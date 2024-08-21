import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { tokenGetter } from '../../app.config';
import { AuthenticationService } from '../../authentication/authentication.service';
import { SharedService } from '../../Shared/shared.service';
import { AlertComponent } from "../../Shared/alert/alert.component";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterOutlet, AlertComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {

  constructor(private router: Router, private authenticationService: AuthenticationService,) {
  
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        SharedService.logUser = this.authenticationService.getLoggedUser();
      }
    });


  }
  get logUser(): any {
    return SharedService.logUser;
  }
  goToDashboard() {
    this.router.navigate(["features/dashboard"]);
  }
  goToHome() {
    this.router.navigate(["features/add-balance"]);
  }
  addNewUser() {
    this.router.navigate(["features/add-new-user"])
  }
  generateReport() {
    this.router.navigate(["features/generate-report"])
  }
  logout() {
    SharedService.logUser = undefined;
    this.authenticationService.logout()
  }

}
