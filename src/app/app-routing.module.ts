import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeAdminComponent} from './components/home/home-admin/home-admin.component';
import {ExamenAddComponent} from './components/examen/examen-add/examen-add.component';
import {ExamenEditComponent} from './components/examen/examen-edit/examen-edit.component';
import {QuestionListComponent} from './components/question/question-list/question-list.component';
import {QuestionAddComponent} from './components/question/question-add/question-add.component';
import {QuestionEditComponent} from './components/question/question-edit/question-edit.component';
import {ReponseEditComponent} from './components/reponse/reponse-edit/reponse-edit.component';
import {AnswerQuizzComponent} from './components/answer-quizz/answer-quizz.component';
import {LoginComponent} from './components/login/login.component';
import {AuthGuard} from './guards/auth.guard';
import {UserListComponent} from './components/user/user-list/user-list.component';


const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'quizz/:id', component: AnswerQuizzComponent},
  {path: 'admin/examen/addquestion/:id', component: QuestionAddComponent},
  {path: 'admin/users', component: UserListComponent},
  {path: 'admin/examen/add', component: ExamenAddComponent},
  {path: 'admin/examen/edit/:id', component: ExamenEditComponent},
  {path: 'admin/examen/:id', component: QuestionListComponent},
  {path: 'admin/reponse/edit/:id', component: ReponseEditComponent},
  {path: 'admin/question/edit/:id', component: QuestionEditComponent},

  {path: 'admin', component: HomeAdminComponent, canActivate: [AuthGuard]},

  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
