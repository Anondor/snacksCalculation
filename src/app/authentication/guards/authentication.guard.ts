import { Injectable } from "@angular/core";
import {  Router, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from "@angular/router";
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
  }