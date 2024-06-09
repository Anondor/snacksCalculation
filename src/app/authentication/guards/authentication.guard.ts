import { Injectable } from "@angular/core";
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, CanActivate } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../authentication.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationGuard  {
  
      constructor(
          private router: Router,
          private authenticationService: AuthenticationService
      ) { }

	  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const user = this.authenticationService.isAuthenticated();
        if (user) {
		let loginUser=this.authenticationService.getLoggedUser();
            // check if route is restricted by role
            if (!!route.data["roles"] && route.data["roles"].indexOf(loginUser.typ) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }

            // authorised so return true
            return true;
        }

        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
    
   
	  /*

	canActivate(
		next: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		if (this.authenticationService.isAuthenticated()) {
	
			return true;
		} else {
			this.router.navigate(['/account/login']);
			return false;
		}
	}
		*/

	
  }