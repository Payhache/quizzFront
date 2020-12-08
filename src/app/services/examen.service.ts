import { Injectable } from '@angular/core';
import { Examen } from '../models/examen';
import { catchError, retry } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import { Question } from '../models/question';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ExamenService {
  apiURL = environment.apiUrl + 'examens';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  getAllExams(): Observable<Examen[]> {
    return this.http.get<Examen[]>(this.apiURL )
    .pipe(retry(1), catchError(this.handleError));
  }


  addExam(exam: Examen): Observable<Examen> {
    return this.http
    .post<Examen>(this.apiURL, exam, this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  deleteExam(id: number): Observable<Examen> {
    return this.http
    .delete<Examen>(this.apiURL + '/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));
  }

  postExamen(examen: Examen): Observable<Examen> {
    return this.http
    .put<Examen>(this.apiURL + '/' + examen.id, examen , this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));

  }

  getOneExam(id: number): Observable<Examen> {
    return this.http
    .get<Examen>(this.apiURL + '/' + id, this.httpOptions)
    .pipe(retry(1), catchError(this.handleError));

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
