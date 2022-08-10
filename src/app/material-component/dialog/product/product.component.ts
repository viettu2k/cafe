import { Subscription } from 'rxjs';
import { GlobalConstants } from './../../../shared/global-constants';
import { SnackbarService } from './../../../services/snackbar/snackbar.service';
import { CategoryService } from './../../../services/category/category.service';
import { ProductService } from './../../../services/product/product.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  Component,
  EventEmitter,
  Inject,
  OnInit,
  OnDestroy,
} from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit, OnDestroy {
  onAddProduct = new EventEmitter();
  onEditProduct = new EventEmitter();
  productForm: any = FormGroup;
  dialogAction: any = 'Add';
  action: any = 'Add';
  responseMessage: any;
  categories: any = [];
  productSub!: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    public dialogRef: MatDialogRef<ProductComponent>,
    private categoryService: CategoryService,
    private snackbarService: SnackbarService
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      name: [
        null,
        [Validators.required, Validators.pattern(GlobalConstants.nameRegex)],
      ],
      category: [null, [Validators.required]],
      description: [null, [Validators.required]],
      price: [null, [Validators.required]],
    });

    if (this.dialogData.action === 'Edit') {
      this.dialogAction = 'Edit';
      this.action = 'Edit';
      this.productForm.patchValue(this.dialogData.product);
    }

    this.getCategories();
  }

  getCategories() {
    this.productSub = this.categoryService.getCategories().subscribe(
      (response: any) => {
        this.categories = response;
      },
      (error: any) => {
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

  handleSubmit() {
    if (this.action === 'Edit') {
      this.edit();
    } else {
      this.add();
    }
  }

  add() {
    const { name, categoryId, desciption, price } = this.productForm.value;
    this.productSub = this.productService
      .add({ name, categoryId, desciption, price })
      .subscribe(
        (response: any) => {
          this.dialogRef.close();
          this.onAddProduct.emit();
          this.responseMessage = response?.message;
          this.snackbarService.openSnackBar(this.responseMessage, '');
        },
        (error) => {
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

  edit() {}

  ngOnDestroy(): void {
    if (this.productSub) {
      this.productSub.unsubscribe();
    }
  }
}
