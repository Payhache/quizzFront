import {Component, OnInit} from '@angular/core';
import {Examen} from '../../../models/examen';
import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faMousePointer} from '@fortawesome/free-solid-svg-icons';
import {User} from '../../../models/user';
import {UserService} from '../../../services/auth/user.service';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  isLoading: boolean;
  users: User[];

  // Font Awesome
  faTrashAlt = faTrashAlt;
  faEdit = faEdit;
  faMousePointer = faMousePointer;


  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data['hydra:member'];
      this.isLoading = false;
    });
  }

}
