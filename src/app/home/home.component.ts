import { LoginComponent } from './../login/login.component';
import { ForgotPasswordComponent } from './../forgot-password/forgot-password.component';
import { RegisterComponent } from './../register/register.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {}

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
}
