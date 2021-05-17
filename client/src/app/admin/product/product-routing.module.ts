import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductEditComponent} from './product-edit/product-edit.component'
import {ProductComponent} from './product.component'
const routes: Routes = [
  { path :'product', component: ProductComponent , data: {breadcrumb: 'Product'}},
  { path :'product-edit/:id', component: ProductEditComponent , data: {breadcrumb: 'Product-Edit'}},
  { path :'product-create', component: ProductEditComponent , data: {breadcrumb: 'Product-Create'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
