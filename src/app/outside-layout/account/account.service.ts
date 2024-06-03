import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

   url: string = 'https://localhost:7257/api/'
	constructor(private http: HttpClient)
  {	//super();
    //LoginAdmin
    //LoginUser
   }

   loginUser(model: any): Observable<any> {
		return this.http.post<any>(`${this.url}LoginAdmin`,model);
	}
}
