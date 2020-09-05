import { Component, OnInit } from '@angular/core';
import { Examen } from 'src/app/models/examen';
import { Router, ActivatedRoute } from '@angular/router';
import { ExamenService } from 'src/app/services/examen.service';


@Component({
  selector: 'app-examen-edit',
  templateUrl: './examen-edit.component.html',
  styleUrls: ['./examen-edit.component.css']
})
export class ExamenEditComponent implements OnInit {
  id:number;
  isLoading:boolean;
  examen:Examen;


  constructor(
    private router: Router,
    private examenService: ExamenService,
    private route: ActivatedRoute

  ) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    this.examenService.getOneExam(this.id).subscribe((data) => {      
      this.examen = data;
      this.isLoading = false
    })
  }
  editExamen() {
    this.examenService.postExamen(this.examen).subscribe( () => {
      console.log(this.examen);
      this.router.navigate(['/admin']);
    })
    
  }

}

