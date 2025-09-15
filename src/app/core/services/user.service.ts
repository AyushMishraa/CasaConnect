import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface UserInterface {
  id: string,
  name: string,
  email: string,
  role: string
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private api$ = `${environment.api$}/api/auth`;

  constructor(private http: HttpClient) { }

  getUserDetails() {
    return this.http.get<UserInterface>(`${this.api$}/users/getUser`);
  }

  updateUser(user: UserInterface) {
    this.http.post<UserInterface>(`${this.api$}/users/updateUser`, user, {withCredentials: true});
  }
}
