import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertService {
  public subject = new Subject<any>();
  constructor() { }
	closeFn = function () {};
	tosterDanger(message: string, noFn: () => void = this.closeFn, type: string = 'toster') {
		this.setConfirmation(message, this.closeFn, noFn, type, 'danger');
	}
  setConfirmation(message: string, siFn: () => void, noFn: () => void, type: string, alertType: string = 'success') {
		let that = this;
 
		this.subject.next({
			type: type,
			text: message,
			alertType: alertType,
			siFn: function () {
				that.subject.next(undefined); //this will close the modal
				siFn();
			},
			noFn: function () {
				that.subject.next(undefined);
				noFn();
			},
		});

		if (type == 'alert-terminated') {
			setTimeout(() => {
				this.subject.next(undefined);
			}, 3000);
		}
	}
}
