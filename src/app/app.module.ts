import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MenuComponent} from './components/parts/menu/menu.component';
import {BsDropdownModule} from 'ngx-bootstrap/dropdown';
import {ModalModule} from 'ngx-bootstrap/modal';
import {ExamenListComponent} from './components/examen/examen-list/examen-list.component';
import {HomeAdminComponent} from './components/home/home-admin/home-admin.component';
import {HttpClientModule} from '@angular/common/http';
import {ExamenAddComponent} from './components/examen/examen-add/examen-add.component';
import {ExamenEditComponent} from './components/examen/examen-edit/examen-edit.component';
import {QuestionListComponent} from './components/question/question-list/question-list.component';
import {QuestionAddComponent} from './components/question/question-add/question-add.component';
import {QuestionEditComponent} from './components/question/question-edit/question-edit.component';
import {ReponseEditComponent} from './components/reponse/reponse-edit/reponse-edit.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {AnswerQuizzComponent} from './components/answer-quizz/answer-quizz.component';
import {MatButtonModule} from '@angular/material/button';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {SpinnerComponent} from './components/parts/spinner/spinner.component';
import {MatRadioModule} from '@angular/material/radio';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExamenListComponent,
    HomeAdminComponent,
    ExamenAddComponent,
    ExamenEditComponent,
    QuestionListComponent,
    QuestionAddComponent,
    QuestionEditComponent,
    ReponseEditComponent,
    AnswerQuizzComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule,
    FontAwesomeModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
