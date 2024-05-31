import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Product } from '../../../shared/interfaces/product.interface';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'Product 1',
      description: 'Description 1',
      imageUrl: 'https://via.placeholder.com/150',
      creationDate: new Date(),
    },
    {
      id: 2,
      name: 'Product 2',
      description: 'Description 2',
      imageUrl: 'https://via.placeholder.com/150',
      creationDate: new Date(),
    },
    {
      id: 3,
      name: 'Product 3',
      description: 'Description 3',
      imageUrl: 'https://via.placeholder.com/150',
      creationDate: new Date(),
    },
  ];

  getProducts(): Observable<Product[]> {
    return of(this.products);
  }

  getProductById(id: number): Observable<Product> {
    const product = this.products.find((p) => p.id === id);
    if (product) {
      return of(product);
    } else {
      return throwError(() => new Error('Product not found'));
    }
  }

  addProduct(product: Product): Observable<Product> {
    product.id = this.products.length + 1;
    this.products.push(product);
    return of(product);
  }

  updateProduct(product: Product): Observable<Product> {
    const index = this.products.findIndex((p) => p.id === product.id);
    if (index !== -1) {
      this.products[index] = product;
      return of(product);
    } else {
      return throwError(() => new Error('Product not can update'));
    }
  }

  deleteProduct(id: number): Observable<void> {
    const index = this.products.findIndex((p) => p.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      return of();
    } else {
      return throwError(() => new Error('Product not can delete'));
    }
  }
}
