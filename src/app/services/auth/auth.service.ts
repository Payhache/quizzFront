import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {retry} from 'rxjs/operators';

const AUTH_API = 'http://127.0.0.1:8000/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  login(credential: User): Observable<any> {
    return this.http.post(AUTH_API + 'login_check', {
      username: credential.username,
      password: credential.password
    });
  }

  saveUser(token: string): Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({Authorization: 'Bearer ' + token})
    };
    return this.http.get<User>(AUTH_API + 'api/user', httpOptions);
  }
}
