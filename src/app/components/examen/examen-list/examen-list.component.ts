import {Component, OnInit} from '@angular/core';
import {Examen} from 'src/app/models/examen';
import {ExamenService} from 'src/app/services/examen.service';
// fontAwesome
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faMousePointer} from '@fortawesome/free-solid-svg-icons';
import {TokenStorageService} from '../../../services/auth/token-storage.service';


@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {

  isLoading: boolean;
  examens: Examen[];

  // Font Awesome
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faMousePointer = faMousePointer;

  isAdmin = false;
  currentUser: any;


  constructor(private examentService: ExamenService,
              private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.currentUser = this.tokenService.getUser();

    if (this.currentUser.roles.includes('ROLE_ADMIN')) {
      this.isAdmin = true;
    }

    this.examentService.getAllExams().subscribe((data) => {
      this.examens = data['hydra:member'];
      this.isLoading = false;
    });
  }

  deleteExamen(id: number) {
    this.isLoading = true;
    this.examentService.deleteExam(id).subscribe(then => {
      this.examentService.getAllExams().subscribe((data: Examen[]) => {
        this.examens = data['hydra:member'];
        this.isLoading = false;
      });
    });
  }
}
