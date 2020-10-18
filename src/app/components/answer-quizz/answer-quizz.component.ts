import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/question';
import {ActivatedRoute} from '@angular/router';
import {ReponseService} from '../../services/reponse.service';
import {ReponseQuestion} from '../../models/reponse-question';


@Component({
  selector: 'app-answer-quizz',
  templateUrl: './answer-quizz.component.html',
  styleUrls: ['./answer-quizz.component.css']
})
export class AnswerQuizzComponent implements OnInit {

  constructor(private  questionService: QuestionService,
              private route: ActivatedRoute) { }

  isLoading: boolean;
  questions: Question[];
  reponse: ReponseQuestion;
  idExam: number;
  isNotStarted = true;
  currentquestion = 0;

  ngOnInit(): void {
    this.idExam = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.questionService.getQuestionsForExam(this.idExam).subscribe((data) => {
      this.questions = data['hydra:member'];
      console.log(this.questions);
      this.isLoading = false;
    });
  }

  startQuizz() {
    this.isNotStarted = false;
  }

  nextQuestion() {
    if (this.currentquestion !== this.questions.length - 1) {
      this.currentquestion++;
    }
  }
  previousQuestion() {
    if (this.currentquestion !== 0) {
      this.currentquestion--;
    }
  }
  submitRep() {
    console.log(this.questions);
  }
}
