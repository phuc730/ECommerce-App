import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {ProductEditComponent} from './product-edit/product-edit.component'
const routes: Routes = [
  { path :'product-edit', component: ProductEditComponent , data: {breadcrumb: 'Product-Edit'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductRoutingModule { }
