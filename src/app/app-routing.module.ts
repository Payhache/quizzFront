import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeAdminComponent } from './components/home/home-admin/home-admin.component';
import { ExamenAddComponent } from './components/examen/examen-add/examen-add.component';


const routes: Routes = [
  { path: 'admin/examen/add', component: ExamenAddComponent },
  { path: 'admin', component: HomeAdminComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
