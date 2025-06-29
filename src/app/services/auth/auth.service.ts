import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private currentUserKey = 'currentUser';
  private returnUrl: string = '/movie';

  constructor() { }  


  register(name: string, email: string, password: string): boolean {
    const users = this.getAllUsers();
    if (users.some(u => u.email === email)) return false;

    const newUser = { name, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem(this.currentUserKey, JSON.stringify(newUser));
    return true;
  }

  login(email: string, password: string): boolean {
    const users = this.getAllUsers();
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      localStorage.setItem(this.currentUserKey, JSON.stringify(user));
      return true;
    }
    return false;
  }

  
  getCurrentUser() {
    const user = localStorage.getItem(this.currentUserKey);
    return user ? JSON.parse(user) : null;
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.currentUserKey);
  }

  private getAllUsers(): any[] {
    return JSON.parse(localStorage.getItem('users') || '[]');
  }

  logout(): void {
    localStorage.removeItem(this.currentUserKey);
    this.resetReturnUrl();
  }

  setReturnUrl(url: string): void {
    this.returnUrl = url;
  }

  getReturnUrl(): string {
    return this.returnUrl;
  }

  resetReturnUrl(): void {
    this.returnUrl = '/movie';
  }


}
