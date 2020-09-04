import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen';
import { ExamenService } from 'src/app/services/examen.service';

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  isloading:boolean;
  examens:Examen[];

  constructor(private examentService:ExamenService) { }

  ngOnInit(): void {

    this.isloading=true;
    this.examentService.getAllExams().subscribe((data) => {
      this.examens = data['hydra:member'];
      this.isloading = false;
      console.log(this.examens);
      
    })
  }

}
