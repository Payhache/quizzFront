import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {Result} from '../models/result';
import {environment} from '../../environments/environment';

const API_URL = environment.apiUrl + 'results';

@Injectable({
  providedIn: 'root'
})
export class ResultService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  addResult(result: Result): Observable<Result> {
    return this.http.post<Result>(API_URL, result, this.httpOptions);
  }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

}
