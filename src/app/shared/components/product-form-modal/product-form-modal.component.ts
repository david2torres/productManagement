import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ProductService } from 'src/app/core/services/productService/product.service';
import { selectedProduct } from '../../interfaces/product.constants';

@Component({
  selector: 'app-product-form-modal',
  templateUrl: './product-form-modal.component.html',
  styleUrls: ['./product-form-modal.component.scss'],
})
export class ProductFormModalComponent implements OnInit {
  @Input() product!: Product;
  @Output() close = new EventEmitter<boolean>();

  isEditMode: boolean = false;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.isEditMode = !!this.product && this.product.id !== 0;
  }

  onSubmit(): void {
    if (this.product) {
      if (this.isEditMode) {
        this.productService.updateProduct(this.product).subscribe(() => {
          this.close.emit(true);
        });
      } else {
        this.productService.addProduct(this.product).subscribe(() => {
          this.close.emit(true);
        });
      }
    }
  }

  onClose(): void {
    this.close.emit(false);
  }
}
