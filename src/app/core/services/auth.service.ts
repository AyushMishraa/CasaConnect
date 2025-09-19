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
   private api = `${environment.api$}/api/auth`;
   private userSub = new BehaviorSubject<UserInterface | null>(null);
   user$ = this.userSub.asObservable();


  constructor(private http: HttpClient) { 
    const stored = localStorage.getItem('user');
    if (stored) {
      this.userSub.next(JSON.parse(stored));
    }
  }
  registerUser(user: UserInterface): Observable<string> {
     this.http.post<{user: UserInterface}>(`${this.api}/user/register`, user, {withCredentials: true})
     .pipe(tap( res => {
        if (res.user) {
          this.setUser(res.user);
        }
      }));
      return of("User registered successfully");
  }

  loginUser(user: UserInterface): Observable<string> {
    this.http.post<{user: UserInterface}>(`${this.api}/user/login`, user, {withCredentials: true})
    .pipe(tap(res => {
      if (res.user) {
        this.setUser(res.user);
      }
    }));
    return of("User logged in successfully");
  }

  logoutUser() {

  }

  setUser(user: UserInterface) {
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser() {
  localStorage.getItem('user');
  }

  isLoggedIn() {
    return !!this.userSub.value;
  }
}
