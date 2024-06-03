import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from './models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private router: Router,
 
  ) { }
/*
  login(user: User) {
    
    return this.http
      .post<User>(this.config.authEndpoint, {
        name: user.name,
        password: user.password
      })
      .pipe(
        map(user => {
          localStorage.setItem("musicUser", JSON.stringify(user));
          return user;
        })
      );
  }
  */

  logout(): void {
    localStorage.removeItem("musicUser");
    this.router.navigate(["/login"]);
  }

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('access_token');
		const helper = new JwtHelperService();
		const isExpired = helper.isTokenExpired(token);
		return !isExpired;
	}
  getLoggedUser() {
    let item=localStorage.getItem("musicUser");
    if(!!item)
    return JSON.parse(item);
  else return null;
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem("musicUser");
  }
}
