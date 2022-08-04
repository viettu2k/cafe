import { GlobalConstants } from './../shared/global-constants';
import { SnackbarService } from './../services/snackbar/snackbar.service';
import { UserService } from './../services/user/user.service';
import { Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  registerForm: any = FormGroup;
  responseMessage: string = '';
  registerSub!: Subscription;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private userService: UserService,
    private snackbarService: SnackbarService,
    private dialogRef: MatDialogRef<RegisterComponent>,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      email: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.emailRegex)],
      ],
      contact: [
        null,
        [
          Validators.required,
          Validators.pattern(GlobalConstants.contactNumberRegex),
        ],
      ],
      password: [null, [Validators.required, Validators.minLength(6)]],
    });
  }

  handleSubmit() {
    this.ngxService.start();
    const { name, email, contact, password } = this.registerForm.value;
    this.registerSub = this.userService
      .register({ name, email, contact, password })
      .subscribe(
        (response: any) => {
          this.ngxService.stop();
          this.dialogRef.close();
          this.responseMessage = response?.message;
          this.snackbarService.openSnackBar(this.responseMessage, '');
          this.router.navigate(['/']);
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
    if (this.registerSub) {
      this.registerSub.unsubscribe();
    }
  }
}
