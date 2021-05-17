import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { from } from 'rxjs';
import {BrandEditComponent} from './brand-edit/brand-edit.component'
import {BrandComponent} from './brand.component'
const routes: Routes = [
  { path :'brand', component: BrandComponent , data: {breadcrumb: 'Brand'}},
  { path :'brand-edit/:id', component: BrandEditComponent , data: {breadcrumb: 'Brand-Edit'}},
  { path :'brand-create', component: BrandEditComponent , data: {breadcrumb: 'Brand-Create'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
