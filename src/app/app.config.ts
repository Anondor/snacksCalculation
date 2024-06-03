import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, HttpClientModule, provideHttpClient, withFetch, withInterceptorsFromDi } from '@angular/common/http';
import { TokenInterceptor } from './authentication/interceptors/token.interceptor';
import { provideClientHydration } from '@angular/platform-browser';
import { JwtModule } from '@auth0/angular-jwt';
export function tokenGetter() {
	return localStorage.getItem('access_token');
}
export const appConfig: ApplicationConfig = {
  providers: [
		provideRouter(routes),
		provideClientHydration(),
		importProvidersFrom(BrowserAnimationsModule),
		provideHttpClient(withFetch(), withInterceptorsFromDi()),
		importProvidersFrom(HttpClientModule),
		importProvidersFrom(
			JwtModule.forRoot({
				config: {
					tokenGetter: tokenGetter,
					allowedDomains: [],
					disallowedRoutes: [],
				},
			})
		),
		{ provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
	],
};

