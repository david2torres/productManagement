import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../../shared/interfaces/product.interface';
import { ProductService } from '../../../core/services/productService/product.service';
import { selectedProduct } from 'src/app/shared/interfaces/product.constants';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm: string = '';
  selectedProduct!: Product;
  isProductFormModalOpen: boolean = false;
  isDelete: boolean = false;

  constructor(private productService: ProductService, private router: Router) {}

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products) => {
      this.products = products;
      this.filteredProducts = products;
    });
  }

  searchProducts(): void {
    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  viewDetails(product: Product): void {
    this.router.navigate(['/product', product.id]);
  }

  editProduct(product: Product): void {
    this.selectedProduct = product;
    this.isProductFormModalOpen = true;
    // this.router.navigate(['/edit-product', product.id]);
  }

  confirmDelete(product: Product): void {
    this.isDelete = true;
    this.selectedProduct = product;
  }

  openCreateProductModal(): void {
    this.selectedProduct = {
      id: 0,
      name: '',
      description: '',
      imageUrl: '',
      creationDate: new Date(),
    };
    this.isProductFormModalOpen = true;
  }

  closeProductFormModal(saved: boolean): void {
    this.isProductFormModalOpen = false;
    if (saved) {
      this.productService.getProducts().subscribe((products) => {
        this.products = products;
        this.filteredProducts = products;
      });
    }
  }

  deleteProduct(): void {
    if (this.selectedProduct) {
      this.isDelete = false;
      this.productService
        .deleteProduct(this.selectedProduct.id)
        .subscribe(() => {
          this.products = this.products.filter( (p) => p.id !== this.selectedProduct!.id);
          this.filteredProducts = this.filteredProducts.filter( (p) => p.id !== this.selectedProduct!.id);
          this.selectedProduct = selectedProduct;
        });
    }
  }

  cancelDelete(): void {
    this.isDelete = false;
    this.selectedProduct = selectedProduct;
  }
}
