import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  isLoading:boolean;
  questions: Question[];

  constructor(private examenService:ExamenService, private route:ActivatedRoute) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.examenService.getQuestionsForExam(id).subscribe((data) => {      
      this.questions = data["hydra:member"];
      this.isLoading = false
      console.log(this.questions);
    })

  }

}
