import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ReponseService} from '../../../services/reponse.service';
import {ReponseQuestion} from '../../../models/reponse-question';

@Component({
  selector: 'app-reponse-edit',
  templateUrl: './reponse-edit.component.html',
  styleUrls: ['./reponse-edit.component.css']
})
export class ReponseEditComponent implements OnInit {
  isLoading: boolean;
  reponse: ReponseQuestion;
  idQuestion: number;

  constructor(
    private router: Router,
    private reponseService: ReponseService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.reponseService.getOneReponse(id).subscribe((data) => {
      this.reponse = data;
      this.isLoading = false;
    });
  }

  submitReponseEdited(reponse: ReponseQuestion) {
    this.reponse.isOk = this.transformToBoolean(reponse.isOk);
    console.log(this.reponse.isOk);
    console.log(this.reponse);
    this.reponseService.putReponse(this.reponse).subscribe(() => {
       this.router.navigate(['/admin/examen', this.reponse.question.examen.id]);
     });
  }

  transformToBoolean(value: string|boolean): boolean {
    return value !== 'Mauvaise réponse';
  }


}
