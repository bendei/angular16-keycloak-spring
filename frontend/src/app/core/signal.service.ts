import {Injectable, signal} from "@angular/core";


@Injectable({
  providedIn: 'root'
})
export class SignalService {

  notifications = signal<string[]>([]);

  constructor() {
    console.log("....................SignalService");
  }

  addNotification(notif: string) {
    console.log("addd");
    this.notifications.update(notifications => [...notifications, notif] );
  }

}
