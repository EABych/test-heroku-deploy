import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable()
export class AuthService {
  constructor(private myRoute: Router) { }
  sendToken(token: string): void {
    localStorage.setItem('LoggedInUser', token);
  }
  getToken(): string {
    return localStorage.getItem('LoggedInUser');
  }
  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }
  logout(): void {
    localStorage.removeItem('LoggedInUser');
  }
}
