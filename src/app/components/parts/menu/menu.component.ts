import {Component, OnInit} from '@angular/core';
import {TokenStorageService} from '../../../services/auth/token-storage.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  isAdmin = false;
  currentUser: any;


  constructor(private tokenService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.currentUser = this.tokenService.getUser();
    if (this.currentUser.roles.includes('ROLE_ADMIN')){
      this.isAdmin = true;
    }
  }

}
