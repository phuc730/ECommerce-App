import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import {AdminComponent} from './admin.component'
import {BrandComponent} from './brand/brand.component'
import {BrandEditComponent} from './brand/brand-edit/brand-edit.component'
const routes: Routes = [
  { path: 'brand', component: BrandComponent ,data: {breadcrumb: 'Brand'} },
  { path: 'brand', loadChildren: () => import('./brand/brand.module').then(mod => mod.BrandModule), data: {breadcrumb: 'Brand'} },

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
