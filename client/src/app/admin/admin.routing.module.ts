import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component'
import {BrandComponent} from './brand/brand.component'
import {ProductComponent} from './product/product.component'
const routes: Routes = [
  { path: 'brand', component: BrandComponent ,data: {breadcrumb: 'Brand'} },
  { path: 'brand', loadChildren: () => import('./brand/brand.module').then(mod => mod.BrandModule), data: {breadcrumb: 'Brand'} },
  { path: 'product', component: ProductComponent ,data: {breadcrumb: 'Product'} },
  { path: 'product', loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule), data: {breadcrumb: 'Product'} },
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
