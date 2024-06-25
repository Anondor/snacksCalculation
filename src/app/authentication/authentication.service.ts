import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
//import { Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { User } from './models/user.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private http: HttpClient,
    private router: Router,
 
  ) { }


  logout(): void {
    localStorage.removeItem("access_token");
    this.router.navigate(["/"]);
  }

	public isAuthenticated(): boolean {
		const token = localStorage.getItem('access_token');
		const helper = new JwtHelperService();
		const isExpired = helper.isTokenExpired(token);
		return !isExpired;
	}
  getLoggedUser() {
    let item=localStorage.getItem("access_token");
  
  
    if(!!item)
      {
        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(item);
        return decodedToken;
      }
  else return null;
  }
  DownloadFile(file: Blob | ArrayBuffer, fileName: string, type: string): void {
    var blob = new Blob([file], { "type": type })
    
    var link = document.createElement("a");
    let reader = new FileReader();
    reader.readAsDataURL(blob);
    link.download = fileName;
    reader.onload = function () {
        if (typeof (reader.result) === 'string') {
            link.href = reader.result; // data url
            link.click();
        }

    };
    link.click();
}
  addUser(model:any)
  {
    return this.http.post<any>(`https://localhost:7206/api/User`, model);
  }
  addUserAmount(model:any)
  {
    return this.http.post<any>(`https://localhost:7206/api/UserCost`, model);
  }
  addUserCost(model:any)
  {
    return this.http.post<any>(`https://localhost:7206/api/User/addCost`, model);
  }
  getAllUser()
  {
    
    return this.http.get<any>(`https://localhost:7206/api/User/UserList`);
  }
  getMonthlyCost(fromDate:string,toDate:string)
  {
    return this.http.get<any>(`https://localhost:7206/api/User/getMonthlyCost?fromDate=${fromDate}&toDate=${toDate}`);
  }
  getExportFile(fromDate:string,toDate:string)
  {
      // return this.http.get<any>(`https://localhost:7206/api/User/exportReport?fromDate=${fromDate}&toDate=${toDate}`);
      return this.http.get(`https://localhost:7206/api/User/exportReport?fromDate=${fromDate}&toDate=${toDate}`,{responseType: 'blob'});
  }
  getUserAmount()
  {
    return this.http.get<any>(`https://localhost:7206/api/UserCost/userAmount`);
  }
  getUserCost()
  {
    return this.http.get<any>(`https://localhost:7206/api/UserCost/userCostAmount`);
  }


}
