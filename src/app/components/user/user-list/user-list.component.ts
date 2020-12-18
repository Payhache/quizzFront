import {Component, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {UserService} from '../../../services/auth/user.service';
import {MatDialog} from '@angular/material/dialog';
import {UserAddComponent} from '../user-add/user-add.component';

import {faTrashAlt} from '@fortawesome/free-solid-svg-icons';
import {faEdit} from '@fortawesome/free-solid-svg-icons';
import {faPoll} from '@fortawesome/free-solid-svg-icons';
import {ActivatedRoute} from '@angular/router';
import {UserResultComponent} from '../user-result/user-result.component';


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
  faShowResult = faPoll;
  faEdit = faEdit;

  // Modal adduser
  userName: string;
  password: string;
  confirmPassword: string;
  roles: string;
  user = new User();

  // Modal Result


  constructor(private userService: UserService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getAllUsers().subscribe((data) => {
      this.users = data['hydra:member'];
      this.isLoading = false;
    });
  }

  deleteUser(id: number) {
    this.isLoading = true;
    this.userService.deleteUser(id).subscribe(then => {
      this.userService.getAllUsers().subscribe((data) => {
        this.users = data['hydra:member'];
        this.isLoading = false;
      });
    });
  }

  openDialog(data?: []): void {
    console.log(data);
    const dialogRef = this.dialog.open(UserAddComponent, {
      width: 'auto',
      data:
        {
          userName: this.userName,
          password: this.password,
          confirmPassword: this.confirmPassword,
          roles: this.roles
        }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (this.checkPasswords(result.password, result.confirmPassword)) {
          this.user.username = result.userName;
          this.user.password = result.password;
          this.user.roles = 'ROLE_USER';
          this.userService.postUser(this.user).subscribe();
        } else {
          console.log(result);
          this.openDialog(result);
        }
      }
    });
  }

  openDialogResult(user: User): void {
    this.dialog.open(UserResultComponent, {
      width: 'auto',
      data:
        {
          userDisplay: user,
        }
    });
  }

  changeRoleToText(role: string): string {
    if (role === 'ROLE_ADMIN') {
      return 'Admin';
    } else {
      return 'Utilisateur';
    }
  }

  checkPasswords(password1, password2) {
    return(password1 === password2);
  }
}
