import { MatDialogRef } from '@angular/material/dialog';
import { GlobalConstants } from './../../../shared/global-constants';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { UserService } from './../../../services/user/user.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss'],
})
export class ChangePasswordComponent implements OnInit {
  changePasswordForm: any = FormGroup;
  responseMessage: string = '';
  changePasswordSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private dialogRef: MatDialogRef<ChangePasswordComponent>,
    private snackbarService: SnackbarService,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.changePasswordForm = this.formBuilder.group({
      oldPassword: [null, [Validators.required, Validators.minLength(6)]],
      newPassword: [null, [Validators.required, Validators.minLength(6)]],
      confirmPassword: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  validateSubmit() {
    if (
      this.changePasswordForm.controls['newPassword'].value !==
      this.changePasswordForm.controls['confirmPassword'].value
    ) {
      return true;
    } else {
      return false;
    }
  }

  handleSubmit() {
    this.ngxService.start();
    const { oldPassword, newPassword } = this.changePasswordForm.value;
    this.changePasswordSub = this.userService
      .changePassword({ oldPassword, newPassword })
      .subscribe(
        (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close();
          this.responseMessage = response?.message;
          this.snackbarService.openSnackBar(this.responseMessage, '');
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
    if (this.changePasswordSub) {
      this.changePasswordSub.unsubscribe();
    }
  }
}
