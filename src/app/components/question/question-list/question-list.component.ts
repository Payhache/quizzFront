import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import {QuestionService} from '../../../services/question.service';
import {ReponseQuestion} from '../../../models/reponse-question';
import {ReponseService} from '../../../services/reponse.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  isLoading: boolean;
  questions: Question[];
  reponses: ReponseQuestion[];
  idExam: number;

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private reponseService: ReponseService) {
  }

  ngOnInit(): void {
    this.idExam = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.questionService.getQuestionsForExam(this.idExam).subscribe((data) => {
      this.questions = data['hydra:member'];
      console.log(this.questions);
      this.isLoading = false;
    });

  }

  deleteQuestion(id: number) {
    this.isLoading = true;
    this.questionService.deleteQuestion(id).subscribe(then => {
      this.questionService.getQuestionsForExam(this.idExam).subscribe((data: Question[]) => {
        this.questions = data['hydra:member'];
        this.isLoading = false;
      });
    });
  }
}
