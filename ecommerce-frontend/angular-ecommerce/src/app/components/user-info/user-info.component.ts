import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/services/tokenStorage/token-storage.service';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  currentUser: any;
  content?: string;

  constructor(private token: TokenStorageService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.currentUser = this.token.getUser();

    this.userService.getUserBoard().subscribe(
      data => {
        this.content = data;
      },
      err => {
        this.content = JSON.parse(err.error).message;
      }
    );
  }
}

