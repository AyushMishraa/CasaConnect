import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {}

export interface UserInterface {
  id: string,
  name: string,
  email: string,
  role: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
   private api = `${environment.api$}/auth`;
   private userSub = new BehaviorSubject<UserInterface | null>(null);
   readonly user$ = new Observable<UserInterface | null>;


  constructor(private http: HttpClient) { 
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userSub.next(JSON.parse(stored));
      this.user$ = this.userSub.asObservable();
    }
  }
  
  registerUser(user: UserInterface): Observable<{user: UserInterface}> {
     return this.http.post<{user: UserInterface}>(`${this.api}/register`, user)
     .pipe(tap( res => {
        if (res) {
          this.setUser(res);
        }
      }));
  }

  loginUser(user: UserInterface): Observable<{user: UserInterface}> {
    return this.http.post<{user: UserInterface}>(`${this.api}/login`, user, {withCredentials: true})
    .pipe(tap(res => {
      if (res.user) {
        this.setUser(res.user);
      }
    }));
  }

  logoutUser() {
    localStorage.removeItem('user');
    this.userSub.next(null);
  }

  setUser(user: any) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
  localStorage.getItem('user');
  }

  isLoggedIn() {
    return !!this.userSub.value;
  }
}
