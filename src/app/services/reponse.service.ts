import { Injectable } from '@angular/core'
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { catchError, retry } from 'rxjs/internal/operators';
import { Observable, throwError } from 'rxjs';
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

  constructor(private http: HttpClient) { }
  getReponsesForQuestion(id: number): Observable<ReponseQuestion[]> {
    return this.http.get<ReponseQuestion[]>(this.apiURL + '?question.id=' + id )
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
