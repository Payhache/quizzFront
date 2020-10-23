import {Component, OnInit, Inject} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Question} from 'src/app/models/question';
import {QuestionService} from '../../../services/question.service';
import {ReponseQuestion} from '../../../models/reponse-question';
import {ReponseService} from '../../../services/reponse.service';
import {MatDialog} from '@angular/material/dialog';
// fontAwesome
import {faTrash} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faCheck} from '@fortawesome/free-solid-svg-icons';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons';
import {ReponseAddComponent} from '../../reponse/reponse-add/reponse-add.component';


@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {


  constructor(private questionService: QuestionService,
              private route: ActivatedRoute,
              private reponseService: ReponseService,
              public dialog: MatDialog) {
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

  reponseName: string;
  reponseValue: boolean;
  questionName: string;
  questionDialog: Question;

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

  deleteReponse(id: number) {
    this.isLoading = true;
    this.reponseService.deleteReponse(id).subscribe(then => {
      this.questionService.getQuestionsForExam(this.idExam).subscribe((data: Question[]) => {
        this.questions = data['hydra:member'];
        this.isLoading = false;
      });
    });

  }

  transformToBoolean(value: string | boolean): boolean {
    return value !== 'Mauvaise réponse';
  }

  openDialog(question: Question): void {
    this.questionId = question.id;
    const dialogRef = this.dialog.open(ReponseAddComponent, {
      width: '75%',
      data:
        {
          reponseName: this.reponseName,
          reponseValue: this.reponseValue
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.reponseToquestion.question = this.questionId;
        this.reponseToquestion.name = result.reponseName;
        if (!result.reponseValue) {
          this.reponseToquestion.isOk = false;
        } else {
          this.reponseToquestion.isOk = true;
        }
        this.reponseService.postReponseToquestion(this.reponseToquestion, this.questionId).subscribe(then => {
          this.questionService.getQuestionsForExam(this.idExam).subscribe((data: Question[]) => {
            this.questions = data['hydra:member'];
          });
        });
      }
    });
  }


}
