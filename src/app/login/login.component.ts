import { GlobalConstants } from './../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { RegisterComponent } from './../register/register.component';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackbarService } from './../services/snackbar/snackbar.service';
import { UserService } from './../services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: any = FormGroup;
  responseMessage: string = '';
  loginSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  handleSubmit() {
    this.ngxService.start();
    const { email, password } = this.loginForm.value;
    this.loginSub = this.userService.login({ email, password }).subscribe(
      (response: any) => {
        this.ngxService.stop();
        this.dialogRef.close();
        localStorage.setItem('token', response.token);
        this.router.navigate(['/cafe/dashboard']);
      },
      (error) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error.message;
        } else {
          this.responseMessage = GlobalConstants.genericError;
        }
        this.snackbarService.openSnackBar(
          this.responseMessage,
          GlobalConstants.error
        );
      }
    );
  }

  ngOnDestroy(): void {
    if (this.loginSub) {
      this.loginSub.unsubscribe();
    }
  }
}
