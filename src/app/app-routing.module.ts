import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductFormComponent } from './feature/product/product-form/product-form.component';

const routes: Routes = [
  { path: '', component: ProductListComponent },
  { path: 'product/:id', component: ProductDetailComponent },
  { path: 'new-product', component: ProductFormComponent },
  { path: 'edit-product/:id', component: ProductFormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
