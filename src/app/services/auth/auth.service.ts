import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {retry} from 'rxjs/operators';
import {JwtHelperService} from '@auth0/angular-jwt';

const AUTH_API = 'https://www.hncshab.fr/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private jwtToken: JwtHelperService) {
  }

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

  isAuthenticated(): boolean {
    const token = sessionStorage.getItem('auth-token');
    return !this.jwtToken.isTokenExpired(token);
  }
}
