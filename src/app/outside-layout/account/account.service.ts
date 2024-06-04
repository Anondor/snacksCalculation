import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { RoleConstants } from '../../authentication/models/user.model';

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

  const helper = new JwtHelperService();
  const decodedToken = helper.decodeToken(token);

  if (
    decodedToken &&
    (decodedToken.typ === RoleConstants.SuperAdmin||decodedToken.typ==RoleConstants.SuperUser)
  ) {
    const isExpired = helper.isTokenExpired(token);
    return !isExpired;
  }

  return false;
}
}
