import { BehaviorSubject, Subject } from 'rxjs';
import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  //取這邊的資料都會取到最後的狀態 進入頁面時 可以用來判斷 是否已登入來導向目標頁面
  loggedInNameTest: Subject<string> = new BehaviorSubject<string>(null);
  isLoggedInTest: Subject<boolean> = new BehaviorSubject<boolean>(false);
  isLoginFailedTest: Subject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  signOut(): void {
    window.sessionStorage.clear();
    this.isLoggedInTest.next(false);
  }

  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    console.log(window.sessionStorage.getItem(TOKEN_KEY))
    console.log(!!window.sessionStorage.getItem(TOKEN_KEY))
    this.isLoggedInTest.next(!!window.sessionStorage.getItem(TOKEN_KEY))
    return window.sessionStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    const user = window.sessionStorage.getItem(USER_KEY);

    console.log(window.sessionStorage)
    if (user) {
      this.loggedInNameTest.next(JSON.parse(user).username)
      return JSON.parse(user);
    }

    return {};
  }
}
