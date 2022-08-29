import { Subscription } from 'rxjs';
import { UserService } from './../services/user/user.service';
import { Router } from '@angular/router';
import { LoginComponent } from './../login/login.component';
import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { RegisterComponent } from './../register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
  homeSub!: Subscription;

  constructor(
    private dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    if (localStorage.getItem('token') !== null) {
      this.homeSub = this.userService.checkToken().subscribe(
        (_response: any) => {
          this.router.navigate(['/cafe/dashboard']);
        },
        (error: any) => {
          console.log(error);
        }
      );
    }
  }

  loginAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(LoginComponent, dialogConfig);
  }

  registerAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(RegisterComponent, dialogConfig);
  }

  forgotPasswordAction() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ForgotPasswordComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    if (this.homeSub) {
      this.homeSub.unsubscribe();
    }
  }
}
