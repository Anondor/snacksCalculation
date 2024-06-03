import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) {
		
	}
 loginUser(model: any): Observable<any> {
 // return this.http.post<any>('https://localhost:7206/api/Login/LoginAdmin', model);
 return this.http.post<any>('https://localhost:7206/api/Login/LoginUser', model);
}

public isNavigatingToSuperUnit(): boolean {
  const token = localStorage.getItem('access_token');

  if (!token) {
    return false;
  }

  console.log(token);
  debugger

  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(token);

  if (
    decodedToken &&
    decodedToken.LoadIndividualProject == false &&
    (decodedToken.Role === "Admin")
  ) {
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  return false;
}
}
