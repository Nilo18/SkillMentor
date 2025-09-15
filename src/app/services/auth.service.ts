// auth.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { firstValueFrom } from 'rxjs';

interface Experience {
  company: string,
  position: string,
  description: string,
}


@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<any>(null);
  currentUser$ = this.currentUserSubject.asObservable();
  private baseURL = 'https://skillmentor-back-production.up.railway.app'

  constructor (private http: HttpClient) {}

  async signup(credentials: FormData) {
    try {
      const res = await firstValueFrom(this.http.post(`${this.baseURL}/signup`, credentials))
    } catch (err) {
      console.log("Failed to sign up: ", err)
      throw err
    }
  }
  
  login(user: any) {
    this.currentUserSubject.next(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
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
