import { Subscription } from 'rxjs';
import { GlobalConstants } from './../../../shared/global-constants';
import { CategoryService } from './../../../services/category/category.service';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  OnInit,
  EventEmitter,
  Inject,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit, OnDestroy {
  onAddCategory = new EventEmitter();
  onEditCategory = new EventEmitter();
  categoryForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: string = '';
  categorySub!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formbuilder: FormBuilder,
    private dialogRef: MatDialogRef<CategoryComponent>,
    private snackbarService: SnackbarService,
    private categoryService: CategoryService
  ) {}

  ngOnInit(): void {
    this.categoryForm = this.formbuilder.group({
      name: [null, [Validators.required]],
    });
    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Update';
      this.categoryForm.patchValue(this.dialogData.category);
    }
  }

  handleSubmit() {
    if (this.dialogAction === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const { name } = this.categoryForm.value;
    this.categorySub = this.categoryService.add({ name }).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onAddCategory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
      },
      (error: any) => {
        this.dialogRef.close();
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

  edit() {
    const { name } = this.categoryForm.value;
    const { id } = this.dialogData.data;
    this.categorySub = this.categoryService.update({ name, id }).subscribe(
      (response: any) => {
        this.dialogRef.close();
        this.onEditCategory.emit();
        this.responseMessage = response.message;
        this.snackbarService.openSnackBar(this.responseMessage, '');
      },
      (error: any) => {
        this.dialogRef.close();
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

  ngOnDestroy(): void {
    if (this.categorySub) {
      this.categorySub.unsubscribe();
    }
  }
}
