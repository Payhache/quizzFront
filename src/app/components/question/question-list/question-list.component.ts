import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Question } from 'src/app/models/question';
import {QuestionService} from '../../../services/question.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.css']
})
export class QuestionListComponent implements OnInit {

  isLoading:boolean;
  questions: Question[];

  constructor(private questionService: QuestionService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.isLoading = true;
    this.questionService.getQuestionsForExam(id).subscribe((data) => {
      this.questions = data["hydra:member"];
      this.isLoading = false
      console.log(this.questions);
    })

  }

}
