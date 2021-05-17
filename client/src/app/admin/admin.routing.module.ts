import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component'
import {BrandComponent} from './brand/brand.component'
import {ProductComponent} from './product/product.component'
import {TypeComponent} from './type/type.component'
import {UserComponent} from './user/user.component'
const routes: Routes = [
  { path: 'brand', component: BrandComponent ,data: {breadcrumb: 'Brand'} },
  { path: 'brand', loadChildren: () => import('./brand/brand.module').then(mod => mod.BrandModule), data: {breadcrumb: 'Brand'} },
  { path: 'product', component: ProductComponent ,data: {breadcrumb: 'Product'} },
  { path: 'product', loadChildren: () => import('./product/product.module').then(mod => mod.ProductModule), data: {breadcrumb: 'Product'} },
  { path: 'type', component: TypeComponent ,data: {breadcrumb: 'Type Product'} },
  { path: 'type', loadChildren: () => import('./type/type.module').then(mod => mod.TypeModule), data: {breadcrumb: 'User'} },
  { path: 'user', component: UserComponent ,data: {breadcrumb: 'User'} },
  { path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule), data: {breadcrumb: 'User'} },
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
