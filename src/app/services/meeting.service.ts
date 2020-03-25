import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { UsersubscriptionService } from './usersubscription.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {

  baseURL: string;

  constructor(private http: HttpClient,
    private subscriptionService: UsersubscriptionService) {
    this.baseURL = environment.url;
  }

  getAllMeetings() {
    return this.http.get(this.baseURL + 'Meeting')
      .pipe(map(response => {
        return response;
      }));
  }

  getAllAttendees() {
    return this.http.get(this.baseURL + 'Meeting/GetAllAttendees')
      .pipe(map(response => {
        return response;
      }));
  }

  addMeeting(meeting) {
    return this.http.post(this.baseURL + 'Meeting', meeting)
      .pipe(map(response => {
        return response;
      }));
  }

  getMeetingById(id: number) {
    return this.http.get(this.baseURL + 'Meeting/' + id)
      .pipe(map(response => {
        return response;
      }));
  }

  updateMeetingDetail(id, meeting) {
    return this.http.put(this.baseURL + 'Meeting/' + id, meeting)
      .pipe(map(response => {
        return response;
      }));
  }

  loginUser(user) {
    return this.http.post<any>(this.baseURL + 'User', user).pipe(map(response => {
      if (response && response.token) {
        localStorage.setItem('authToken', response.token);
        this.setUserDetails();
        localStorage.setItem('userId', response.userDetails.userID);
      }
      return response;
    }));
  }

  logout() {
    localStorage.clear();
    this.subscriptionService.userData.next(new User());
  }

  setUserDetails() {
    if (localStorage.getItem('authToken')) {
      const userDetails = new User();
      const decodeUserDetails = JSON.parse(atob(localStorage.getItem('authToken').split('.')[1]));

      userDetails.userId = decodeUserDetails.userid;
      userDetails.username = decodeUserDetails.sub;
      userDetails.isLoggedIn = true;

      this.subscriptionService.userData.next(userDetails);
    }
  }
}
