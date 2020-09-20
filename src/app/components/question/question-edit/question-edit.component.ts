import { Component, OnInit } from '@angular/core';
import {Question} from '../../../models/question';
import {ActivatedRoute, Router} from '@angular/router';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-question-edit',
  templateUrl: './question-edit.component.html',
  styleUrls: ['./question-edit.component.css']
})
export class QuestionEditComponent implements OnInit {
  id: number;
  isLoading: boolean;
  question: Question;

  constructor(
    private router: Router,
    private questionService: QuestionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.questionService.getOneQuestion(id).subscribe((data) => {
      this.question = data;
      this.isLoading = false;
    });
  }
  editQuestion() {
    this.questionService.putQuestion(this.question).subscribe( () => {
      console.log(this.question);
      this.router.navigate(['/admin']);
    });
  }

}
