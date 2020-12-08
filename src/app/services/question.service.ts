import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs';
import { Question } from '../models/question';
import {Examen} from '../models/examen';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {
  apiURL = environment.apiUrl + 'questions';
  httpOptions = {
    headers: new HttpHeaders({
    'Content-Type': 'application/json'
    })
    };

  constructor(private http: HttpClient) { }

  getAllQuestions(): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiURL)
    .pipe(retry(1), catchError(this.handleError));
  }
  getOneQuestion(id: number): Observable<Question> {
    return this.http
      .get<Question>(this.apiURL  + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  deleteQuestion(id: number): Observable<Question> {
    return this.http
      .delete<Question>(this.apiURL  + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  getQuestionsForExam(id: number): Observable<Question[]> {
    return this.http.get<Question[]>(this.apiURL + '?examen.id=' + id )
      .pipe(retry(1), catchError(this.handleError));
  }

  addQuestionOnExam(question: Question, id: number): Observable<Question> {
    return this.http
      .post<Question>(this.apiURL + '?examen.id=' + id, question, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  putQuestion(question: Question): Observable<Question> {
    return this.http
      .put<Question>(this.apiURL + '/' + question.id, question , this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }
  // EN cas d'erreure de communication avec le serveur
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
