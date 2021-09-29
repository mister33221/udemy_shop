import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = "authenticatedUser"
  private baseUrl = 'http://localhost:8080/auth/v1/authentication';

  public username: any;
  public password: any;

  constructor(private http: HttpClient) { }

  authenticationService(username: String, password: String){
    console.log("in1")
    return this.http.get(`${this.baseUrl}`,
    { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
}

createBasicAuthToken(username: String, password: String) {
  return 'Basic ' + window.btoa(username + ":" + password)
}

registerSuccessfulLogin(username: any, password: any) {
  sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
}

logout() {
  sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
  this.username = null;
  this.password = null;
}

isUserLoggedIn() {
  let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  if (user === null) return false
  return true
}

getLoggedInUserName() {
  let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
  if (user === null) return ''
  return user
}
}


