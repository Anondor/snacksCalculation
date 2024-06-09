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
    let modelvalue =
    {
      phone: model.phone,
      password: model.password
    }
    if (model.isAdmin == true) {
      return this.http.post<any>('https://localhost:7206/api/Login/LoginAdmin', modelvalue);
    }
    else {

      return this.http.post<any>('https://localhost:7206/api/Login/LoginUser', modelvalue);
    }

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
      (decodedToken.typ === RoleConstants.SuperAdmin.toString() || decodedToken.typ == RoleConstants.SuperUser.toString())) 
      {
      const isExpired = helper.isTokenExpired(token);
      return !isExpired;
    }

    return false;
  }
}
