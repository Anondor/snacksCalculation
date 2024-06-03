import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

	constructor(private http: HttpClient) {
		
	}
 loginUser(model: any): Observable<any> {
  return this.http.post<any>('https://localhost:7206/LoginAdmin', model);
}
}
