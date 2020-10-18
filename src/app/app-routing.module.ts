import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { ExamenAddComponent } from './components/examen/examen-add/examen-add.component';
import { ExamenEditComponent } from './components/examen/examen-edit/examen-edit.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import {QuestionAddComponent} from './components/question/question-add/question-add.component';
import {QuestionEditComponent} from './components/question/question-edit/question-edit.component';
import {ReponseEditComponent} from './components/reponse/reponse-edit/reponse-edit.component';
import {AnswerQuizzComponent} from './components/answer-quizz/answer-quizz.component';


const routes: Routes = [
  { path: 'quizz/:id', component: AnswerQuizzComponent },
  { path: 'admin/examen/addquestion/:id', component: QuestionAddComponent },
  { path: 'admin/examen/add', component: ExamenAddComponent },
  { path: 'admin/examen/edit/:id', component: ExamenEditComponent },
  { path: 'admin/examen/:id', component: QuestionListComponent },
  { path: 'admin/reponse/edit/:id', component: ReponseEditComponent },
  { path: 'admin/question/edit/:id', component: QuestionEditComponent },

  { path: 'admin', component: HomeAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
