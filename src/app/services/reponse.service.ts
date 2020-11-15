import {Injectable} from '@angular/core';
import {HttpHeaders, HttpClient} from '@angular/common/http';
import {catchError, retry} from 'rxjs/internal/operators';
import {Observable, throwError} from 'rxjs';
import {Question} from '../models/question';
import {ReponseQuestion} from '../models/reponse-question';

@Injectable({
  providedIn: 'root'
})
export class ReponseService {
  apiURL = 'http://127.0.0.1:8000/api/reponses';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  getReponsesForQuestion(id: number): Observable<ReponseQuestion[]> {
    return this.http.get<ReponseQuestion[]>(this.apiURL + '?question.id=' + id)
      .pipe(retry(1), catchError(this.handleError));
  }

  postReponseToquestion(reponseQuestion: ReponseQuestion, id: number): Observable<ReponseQuestion> {
    return this.http
      .post<ReponseQuestion>(this.apiURL + '?question.id=' + id, reponseQuestion, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));

  }

  deleteReponse(id: number): Observable<ReponseQuestion> {
    return this.http
      .delete<ReponseQuestion>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));

  }

  getOneReponse(id: number): Observable<ReponseQuestion> {
    return this.http
      .put<ReponseQuestion>(this.apiURL + '/' + id, this.httpOptions)
      .pipe(retry(1), catchError(this.handleError));
  }

  putReponse(reponse: ReponseQuestion): Observable<ReponseQuestion> {
    return this.http
      .put<ReponseQuestion>(this.apiURL + '/' + reponse.id, {
        id: reponse.id,
        name: reponse.name,
        isOk: reponse.isOk,
        explanation: reponse.explanation,
        picture: reponse.picture,
        picture2: reponse.picture2,
        picture3: reponse.picture3,
        question: reponse.question.id
      }, this.httpOptions)
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
