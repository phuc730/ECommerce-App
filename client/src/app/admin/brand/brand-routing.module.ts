import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {BrandEditComponent} from './brand-edit/brand-edit.component'
const routes: Routes = [
  { path :'brand-edit', component: BrandEditComponent , data: {breadcrumb: 'Brand-Edit'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandRoutingModule { }
