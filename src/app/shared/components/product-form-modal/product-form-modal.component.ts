import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from 'src/app/core/services/productService/product.service';
import { selectedProduct } from '../../interfaces/product.constants';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product-form-modal.component.html',
  styleUrls: ['./product-form-modal.component.scss'],
})
export class ProductFormModalComponent implements OnInit {
  @Input() product!: Product;
  @Output() close = new EventEmitter<boolean>();

  isEditMode: boolean = false;
  productForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.isEditMode = !!this.product && this.product.id !== 0;
    this.mapEditForm(this.isEditMode, this.product);
  }

  private mapEditForm(isEdit: boolean, product: Product): void {
    debugger;
    if (isEdit) {
      this.productForm.patchValue(product);
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        id: this.product.id ? this.product.id : 0,
        ...this.productForm.value,
        creationDate: new Date(),
      };

      if (this.isEditMode) {
        this.productService.updateProduct(product).subscribe(() => {
          this.close.emit(true);
        });
      } else {
        this.productService.addProduct(product).subscribe(() => {
          this.close.emit(true);
        });
      }
    }
  }

  onClose(): void {
    this.close.emit(false);
  }
}
