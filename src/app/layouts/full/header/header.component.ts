import { Subscription } from 'rxjs';
import { ChangePasswordComponent } from './../../../material-component/dialog/change-password/change-password.component';
import { ConfirmationComponent } from './../../../material-component/dialog/confirmation/confirmation.component';
import { Component, OnDestroy } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: [],
})
export class AppHeaderComponent implements OnDestroy {
  logoutSub!: Subscription;
  role: any;
  constructor(private router: Router, private dialog: MatDialog) {}

  logout() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      message: 'Logout',
    };
    const dialogRef = this.dialog.open(ConfirmationComponent, dialogConfig);
    this.logoutSub = dialogRef.componentInstance.onEmitStatusChange.subscribe(
      (_user) => {
        dialogRef.close();
        localStorage.clear();
        this.router.navigate(['/']);
      }
    );
  }

  changePassword() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.width = '550px';
    this.dialog.open(ChangePasswordComponent, dialogConfig);
  }

  ngOnDestroy(): void {
    if (this.logoutSub) {
      this.logoutSub.unsubscribe();
    }
  }
}
