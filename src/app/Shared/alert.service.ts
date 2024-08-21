import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject } from 'rxjs';
export interface Alert {
	type: string;
	message: string;
  }
@Injectable({
  providedIn: 'root'
})
export class AlertService {
	private alertsSubject = new Subject<Alert>();
	alerts$ = this.alertsSubject.asObservable();
  
	// Emit an alert
	alert(type: string, message: string) {
	  this.alertsSubject.next({ type, message });
	}
  
	// Clear all alerts (optional)
	clear() {
	  this.alertsSubject.next({ type: '', message: '' });
	}
}
