// src/app/product-form/product-form.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../../core/services/productService/product.service';
import { Product } from '../../../shared/interfaces/product.interface';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss']
})
export class ProductFormComponent implements OnInit {
  productForm: FormGroup;
  isEditMode: boolean = false;
  productId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      imageUrl: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.productId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.productId) {
      this.isEditMode = true;
      this.productService.getProductById(this.productId).subscribe(product => {
        this.productForm.patchValue(product);
      });
    }
  }

  onSubmit(): void {
    if (this.productForm.valid) {
      const product: Product = {
        id: this.productId ? this.productId : 0,
        ...this.productForm.value,
        creationDate: new Date()
      };
      if (this.isEditMode) {
        this.productService.updateProduct(product).subscribe(() => this.router.navigate(['/']));
      } else {
        this.productService.addProduct(product).subscribe(() => this.router.navigate(['/']));
      }
    }
  }

  cancel(): void {
    this.router.navigate(['/']);
  }
}
