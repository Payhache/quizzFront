import { Component, OnInit } from '@angular/core';
import {QuestionService} from '../../../services/question.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Question} from '../../../models/question';

@Component({
  selector: 'app-question-add',
  templateUrl: './question-add.component.html',
  styleUrls: ['./question-add.component.css']
})
export class QuestionAddComponent implements OnInit {
  id: number;
  question = new Question();

  constructor(
    private questionService: QuestionService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id');
  }
  submitQuestion(): void {
    this.question.examen = this.id;
    this.questionService.addQuestionOnExam(this.question, this.id).subscribe( data => {
      this.router.navigate(['/admin/examen', this.id]);
    });
  }
}
