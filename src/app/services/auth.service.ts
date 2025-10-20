// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { firstValueFrom } from 'rxjs';
import { BackendUrlHolderService } from './backend-url-holder.service';

interface Experience {
  company: string,
  position: string,
  description: string,
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private baseURL: string

  constructor (private http: HttpClient, private urlHolder: BackendUrlHolderService) {
    this.baseURL = urlHolder.getBaseURL()
  }

  async signup(credentials: FormData) {
    try {
      console.log("I'm running before sending the request.")
      const res = await firstValueFrom(this.http.post<any>(`${this.baseURL}/signup`, credentials))
      console.log("I'm running after sending the request.")
      console.log("And I received a response: ", res)
    } catch (err) {
      console.log("Failed to sign up: ", err)
      throw err
    }
  }

  async verifyEmail(token: string) {
    try {
      const res = await firstValueFrom(this.http.get<{accessToken: string}>(`${this.baseURL}/verify-email/${token}`))
      console.log(res)
      return res.accessToken
    } catch (err) {
      console.log('Failed to verify email: ', err)
      throw err
    }
  }
  
  async login(userEmail: string, userPassword: string) {
    try {
      const body = {
        email: userEmail,
        password: userPassword
      }
      const res = await firstValueFrom(this.http.post<{accessToken: string}>(`${this.baseURL}/signin`, body))
      console.log(res)
      console.log(res.accessToken)
      return res
    } catch (err) {
      console.log('Failed to log in: ', err);
      throw err;
    }
  }

  logout() {
    this.currentUserSubject.next(null);
    localStorage.removeItem('currentUser');
  }

  loadUserFromStorage() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      this.currentUserSubject.next(JSON.parse(user));
    }
  }
}
