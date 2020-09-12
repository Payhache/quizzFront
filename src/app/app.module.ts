import {FormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MenuComponent } from './components/parts/menu/menu.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ExamenListComponent } from './components/examen/examen-list/examen-list.component';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { HttpClientModule } from '@angular/common/http';
import { ExamenAddComponent } from './components/examen/examen-add/examen-add.component';
import { ExamenEditComponent } from './components/examen/examen-edit/examen-edit.component';
import { QuestionListComponent } from './components/question/question-list/question-list.component';
import { QuestionAddComponent } from './components/question/question-add/question-add.component';



@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    ExamenListComponent,
    HomeAdminComponent,
    ExamenAddComponent,
    ExamenEditComponent,
    QuestionListComponent,
    QuestionAddComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
