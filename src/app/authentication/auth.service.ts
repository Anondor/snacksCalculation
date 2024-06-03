import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
	isLoggedIn() {
		return !!this.getToken();
	}

	getToken() {
		let token = localStorage.getItem('access_token');
		return token;
	}

	saveToken(tokenData: { accessToken: string }) {
		this.logOut();
		localStorage.setItem('access_token', tokenData.accessToken);
	}

	logOut() {
		localStorage.removeItem('access_token');
		localStorage.removeItem('User_Name');
	}

	getCurrentProjectName() {
		let token = localStorage.getItem('access_token');
		if (token) {
			const parts = token.split('.');
			if (parts[1]) {
				const obj = JSON.parse(atob(parts[1]));
				return obj.ProjectName;
			}
		}
		return null;
	}
}
