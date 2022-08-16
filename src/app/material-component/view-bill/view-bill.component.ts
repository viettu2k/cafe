import { Router } from '@angular/router';
import { ViewBillProductsComponent } from './../dialog/view-bill-products/view-bill-products.component';
import { GlobalConstants } from './../../shared/global-constants';
import { MatTableDataSource } from '@angular/material/table';
import { SnackbarService } from './../../services/snackbar/snackbar.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Component, OnInit } from '@angular/core';
import { BillService } from 'src/app/services/bill/bill.service';

@Component({
  selector: 'app-view-bill',
  templateUrl: './view-bill.component.html',
  styleUrls: ['./view-bill.component.scss'],
})
export class ViewBillComponent implements OnInit {
  displayedColumns: string[] = [
    'name',
    'email',
    'contact',
    'paymentMethod',
    'total',
    'view',
  ];
  dataSource: any;
  responseMessage: string = '';

  constructor(
    private billService: BillService,
    private ngxService: NgxUiLoaderService,
    private dialog: MatDialog,
    private snackbarService: SnackbarService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.ngxService.start();
    this.tableData();
  }

  tableData() {
    this.billService.getBills().subscribe(
      (response: any) => {
        this.ngxService.stop();
        console.log(response);
        this.dataSource = new MatTableDataSource(response);
      },
      (error: any) => {
        this.ngxService.stop();
        if (error.error?.message) {
          this.responseMessage = error.error?.message;
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

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  handleViewAction(values: any) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = {
      data: values,
    };
    dialogConfig.width = '100%';
    const dialogRef = this.dialog.open(ViewBillProductsComponent);
    this.router.events.subscribe(() => {
      dialogRef.close();
    });
  }

  downloadReportAction(values: any) {}

  handleDeleteAction(values: any) {}
}
