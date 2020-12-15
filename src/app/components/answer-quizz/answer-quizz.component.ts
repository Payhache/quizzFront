import {Component, OnInit} from '@angular/core';
import {QuestionService} from '../../services/question.service';
import {Question} from '../../models/question';
import {ActivatedRoute, Router} from '@angular/router';
import {MatRadioChange} from '@angular/material/radio';
import {Result} from '../../models/result';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {ResultService} from '../../services/result.service';


@Component({
  selector: 'app-answer-quizz',
  templateUrl: './answer-quizz.component.html',
  styleUrls: ['./answer-quizz.component.css']
})
export class AnswerQuizzComponent implements OnInit {

  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private tokenService: TokenStorageService,
              private resultService: ResultService,
              private router: Router) {
  }

  isLoading: boolean;
  questions: Question[];
  question: Question;
  finalResult = new Result();
  currentUser: any;
  idExam: number;
  isNotStarted = true;
  isGoodAnswer: boolean;
  reponseQuestionSubmited: number[] = [];
  isDisabled = false;
  isSelected = false;
  currentquestion = 0;
  scoreExam = 0;
  displayCorrectAnswer: boolean;
  displayExplanations: boolean;


  ngOnInit(): void {
    this.idExam = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.currentUser = this.tokenService.getUser().id;
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
    this.hideExplanationsAndUserAnswer();
    this.isSelected = false;
    if (this.currentquestion !== this.questions.length - 1) {
      this.currentquestion++;
      this.question = this.questions[this.currentquestion];
      this.isDisabled = this.checkNumberInArray(this.question.id);
      return this.question;
    }
  }

  previousQuestion(): Question {
    this.hideExplanationsAndUserAnswer();
    this.isSelected = false;
    if (this.currentquestion !== 0) {
      this.currentquestion--;
      this.question = this.questions[this.currentquestion];
      this.isDisabled = this.checkNumberInArray(this.question.id);
      return this.question;
    }
  }

  choice(radioSelected: MatRadioChange) {
    this.isSelected = true;
    this.isGoodAnswer = radioSelected.value.isOk;
    this.isGoodAnswer = radioSelected.value.isOk;
  }

  validateReponse() {
    this.isSelected = false;
    this.reponseQuestionSubmited.push(this.question.id);
    if (this.isGoodAnswer) {
      this.scoreExam++;
      this.displayCorrectAnswer = true;
    } else {
      this.displayCorrectAnswer = false;
    }
    this.displayExplanations = true;
    if (this.checkNumberInArray(this.question.id)) {
      this.isDisabled = true;
    }
    if (this.reponseQuestionSubmited.length === this.questions.length) {
      this.finalResult.questionnaire = this.question.examen.name;
      this.finalResult.score = this.changeResultToPercent(this.questions.length, this.scoreExam).toString();
      this.finalResult.user = this.currentUser;
      this.resultService.addResult(this.finalResult).subscribe(() => {
        this.router.navigate(['/admin']);
      } );
      alert(`Examen fini tu as obtenu ${this.scoreExam} bonne(s) réponse(s)`);
    }
  }

  checkNumberInArray(numberTofind: number) {
    return this.reponseQuestionSubmited.includes(numberTofind);
  }

  changeResultToPercent(nbreQuestion: number, score: number): number {
    return Math.round(score / nbreQuestion * 100);
  }

  hideExplanationsAndUserAnswer() {
    this.displayExplanations = false;
    this.displayCorrectAnswer = null;
  }
}
