import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;

  isLoggedInTest = false;
  isLoginFailedTest = false;


  errorMessage = '';
  roles: string[] = [];


  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.tokenStorage.isLoggedInTest.next(true);
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    console.log(this.form)
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        console.log(data)

        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;

        this.tokenStorage.isLoggedInTest.next(true);
        this.tokenStorage.isLoginFailedTest.next(false)

        this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
        this.router.navigate(['/product'], { relativeTo: this.route });
      },
      err => {
        console.log(err.error);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;

        this.tokenStorage.isLoginFailedTest.next(true)
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
}
