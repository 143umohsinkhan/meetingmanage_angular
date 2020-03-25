import { Component } from '@angular/core';
import { MeetingService } from './services/meeting.service';
import { Router } from '@angular/router';
import { UsersubscriptionService } from './services/usersubscription.service';
import { User } from './models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'My Meeting Manager';
  userData :User;
  
  constructor(private service: MeetingService,
    private userSubscriptionService : UsersubscriptionService,
    private router: Router) { 
      this.userSubscriptionService.userData.asObservable().subscribe(data => {
        this.userData = data;
      });
    }

  logout() {
    this.service.logout();
    this.router.navigate(['']);
  }
}


