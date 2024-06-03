import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { LibraryConfig } from './models/config';
import { User } from './models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private router: Router,
    @Inject('config') private config: LibraryConfig) { }

  login(user: User): Observable<User> {
    return this.http
      .post<User>(this.config.authEndpoint, {
        username: user.username,
        password: user.password
      })
      .pipe(
        map(user => {
          localStorage.setItem("musicUser", JSON.stringify(user));
          return user;
        })
      );
  }

  logout(): void {
    localStorage.removeItem("musicUser");
    this.router.navigate(["/login"]);
  }

  getLoggedUser(): User {
    return JSON.parse(localStorage.getItem("musicUser"))
  }

  isUserAuthenticated(): boolean {
    return !!localStorage.getItem("musicUser");
  }
}
