import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import {QuestionService} from '../../../services/question.service';
import {ReponseQuestion} from '../../../models/reponse-question';
import {ReponseService} from '../../../services/reponse.service';
// fontAwesome
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { faCheck } from '@fortawesome/free-solid-svg-icons';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {


  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private reponseService: ReponseService) {
  }

  faTimesCircle = faTimesCircle;
  faTrash = faTrash;
  faEdit = faEdit;
  faCheck = faCheck;
  isLoading: boolean;

  writeReponse = false;
  questionId: number;
  questions: Question[];
  reponseToquestion = new ReponseQuestion();
  idExam: number;

  ngOnInit(): void {
    this.idExam = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.questionService.getQuestionsForExam(this.idExam).subscribe((data) => {
      this.questions = data['hydra:member'];
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
  showFormAddReponse(id: number) {
    this.questionId = id;
    this.writeReponse = this.writeReponse === false;
  }

  submitReponse(id: number) {
    this.reponseToquestion.isOk = this.transformToBoolean(this.reponseToquestion.isOk);
    this.reponseToquestion.question = id;
    this.reponseService.postReponseToquestion(this.reponseToquestion, id).subscribe(then => {
      this.questionService.getQuestionsForExam(this.idExam).subscribe((data: Question[]) => {
        this.questions = data['hydra:member'];
        this.writeReponse = false;
        this.isLoading = false;
      });
    });
  }
  deleteReponse(id: number) {
    this.isLoading = true;
    this.reponseService.deleteReponse(id).subscribe(then => {
      this.questionService.getQuestionsForExam(this.idExam).subscribe((data: Question[]) => {
        this.questions = data['hydra:member'];
        this.isLoading = false;
      });
    });

  }
  transformToBoolean(value: string|boolean): boolean {
    return value !== 'Mauvaise réponse';
  }
}
