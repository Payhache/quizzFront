import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {User} from '../../models/user';
import {catchError, retry} from 'rxjs/operators';

const API_URL = 'http://127.0.0.1:8000/api/users';
const API_REGISTER = 'http://127.0.0.1:8000/register';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(API_URL)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteUser(id: number): Observable<User> {
    return this.http
      .delete<User>(API_URL + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  postUser(user: User): Observable<User> {
    return this.http
      .post<User>(API_REGISTER, user, this.httpOptions);
  }

  // En cas d'erreure de communication avec le serveur
  handleError(error) {
    // déclaration d'une variable vide pour y associer un message d'erreur
    let errorMessage = '';
    // Si j'ai pas compris ....
    if (error.error instanceof ErrorEvent) {
      // Get client-side error
      errorMessage = error.error.message;
    } else {
      // Get server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
