import { Component, OnInit } from '@angular/core';
import { ExamenService } from 'src/app/services/examen.service';
import { Examen } from 'src/app/models/examen';
import { Router } from '@angular/router';

@Component({
  selector: 'app-examen-add',
  templateUrl: './examen-add.component.html',
  styleUrls: ['./examen-add.component.css']
})
export class ExamenAddComponent implements OnInit {

  constructor(private examenservice: ExamenService, private router:Router) { }
  
  examen = new Examen;



  ngOnInit(): void {
  }

  submitExamen():void {
    this.examenservice.addExam(this.examen).subscribe(data => {
      this.router.navigate(['/admin']);
    })
    
  }
}
