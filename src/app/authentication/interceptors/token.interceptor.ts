import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { AuthenticationService } from "../authentication.service";
import { AuthService } from "../auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {
    constructor(private inject: Injector) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		let authService = this.inject.get(AuthService);
		let authReq = req;

		if (authService.isLoggedIn()) authReq = this.addTokenHeader(req, authService.getToken());

		return next.handle(authReq).pipe(
			catchError((errordata: any) => {
				if (errordata instanceof HttpErrorResponse && errordata.status === 401) {
					return throwError(errordata);
				}
				return throwError(errordata);
			})
		);
	}

	addTokenHeader(request: HttpRequest<any>, token: any) {
		return request.clone({
			headers: request.headers.set('Authorization','Bearer '+token),
		});
	}
}