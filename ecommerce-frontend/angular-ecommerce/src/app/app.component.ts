import { AuthService } from 'src/app/services/auth/auth.service';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from './services/tokenStorage/token-storage.service';
import { ThisReceiver } from '@angular/compiler';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular-ecommerce';

  private roles: string[] = [];

  isLoggedIn = false;
  showAdminBoard = false;

  loggedInNameTest = '';
  isLoggedInTest = false;
  isLoginFailedTest = false;

  showModeratorBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    ) { }


    ngOnInit(): void {
      this.updateLoggedInStatus();

      //兩個驚嘆號 表示  如果有get到就true 沒有的話就null
      this.isLoggedIn = !!this.tokenStorageService.getToken();

      if (this.isLoggedIn) {
        const user = this.tokenStorageService.getUser();
        this.roles = user.roles;

        this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
        this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

        this.username = user.username;
        this.loggedInNameTest = user.username;
      }
    }
  logout(): void {
    this.tokenStorageService.signOut();
    this.router.navigate(['/product'],{relativeTo: this.route})

    // window.location.reload();
  }


  updateLoggedInStatus() {

    //訂閱登入狀態
    this.tokenStorageService.isLoggedInTest.subscribe(
      data => this.isLoggedInTest = data
    )
    //訂閱登入狀態
    this.tokenStorageService.isLoginFailedTest.subscribe(
      data => this.isLoginFailedTest = data
    )

    //訂閱登入者名稱
    this.tokenStorageService.loggedInNameTest.subscribe(
      data => this.loggedInNameTest = data
    )
  }

}
