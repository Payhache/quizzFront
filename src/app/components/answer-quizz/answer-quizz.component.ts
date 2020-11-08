import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/question';
import {ActivatedRoute} from '@angular/router';
import {MatRadioChange} from '@angular/material/radio';


@Component({
  selector: 'app-answer-quizz',
  templateUrl: './answer-quizz.component.html',
  styleUrls: ['./answer-quizz.component.css']
})
export class AnswerQuizzComponent implements OnInit {

  constructor(private  questionService: QuestionService,
              private route: ActivatedRoute) {
  }

  isLoading: boolean;
  questions: Question[];
  question: Question;
  idExam: number;
  isNotStarted = true;
  isGoodAnswer: boolean;
  reponseQuestionSubmited: number[] = [];
  isDisabled = false;
  currentquestion = 0;
  scoreExam = 0;


  ngOnInit(): void {
    this.idExam = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.questionService.getQuestionsForExam(this.idExam).subscribe((data) => {
      this.questions = data['hydra:member'];
      this.isLoading = false;
    });
  }


  startQuizz() {
    this.isNotStarted = false;
    this.question = this.questions[0];
  }

  nextQuestion(): Question {
    if (this.currentquestion !== this.questions.length - 1) {
      this.currentquestion++;
      this.question = this.questions[this.currentquestion];
      this.isDisabled = this.checkNumberInArray(this.question.id);
      return this.question;
    }
  }

  previousQuestion(): Question {
    if (this.currentquestion !== 0) {
      this.currentquestion--;
      this.question = this.questions[this.currentquestion];
      this.isDisabled = this.checkNumberInArray(this.question.id);
      return this.question;
    }
  }

  choice(radioSelected: MatRadioChange) {
    this.isGoodAnswer = radioSelected.value.isOk;
  }

  validateReponse() {
    this.reponseQuestionSubmited.push(this.question.id);
    if (this.isGoodAnswer) {
      this.scoreExam++;
    }
    if (this.checkNumberInArray(this.question.id)) {
      this.isDisabled = true;
    }
    if (this.reponseQuestionSubmited.length === this.questions.length) {
      alert(`Examen finit tu as obtenu ${this.scoreExam}`);
    }
  }

  checkNumberInArray(numberTofind: number) {
    return this.reponseQuestionSubmited.includes(numberTofind);
  }


}
