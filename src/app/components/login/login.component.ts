import {Component, OnInit} from '@angular/core';
import {AuthService} from '../../services/auth/auth.service';
import {TokenStorageService} from '../../services/auth/token-storage.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  onSubmit(): void {

    this.authService.login(this.form).subscribe(
      data => {
        this.tokenStorage.saveToken(data.token);
        this.authService.saveUser(data.token).subscribe(user => {
          this.tokenStorage.saveCurrentUser(user);
          this.router.navigate(['/admin']);
        });

        // this.isLoginFailed = false;
        // this.isLoggedIn = true;
        // this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
      },
      err => {
        // this.errorMessage = err.error.message;
        // this.isLoginFailed = true;
        console.log(err);
      }
    );
    console.log(this.form);
  }
}
