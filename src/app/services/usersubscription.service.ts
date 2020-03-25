import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UsersubscriptionService {

  userData = new BehaviorSubject<User>(new User());

  constructor() { }
}
