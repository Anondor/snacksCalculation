import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { AuthenticationService } from "../authentication.service";

@Injectable({
    providedIn: 'root'
  })
  export class AuthenticationGuard implements CanActivate {
  
      constructor(
          private router: Router,
          private authenticationService: AuthenticationService
      ) { }
    
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
          const currentUser = this.authenticationService.getLoggedUser();
          if (currentUser) {
              return true;
          }
  
          this.router.navigate(['/login']);
          return false;
      }
  }