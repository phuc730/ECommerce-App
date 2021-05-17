import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {TypeEditComponent} from './type-edit/type-edit.component'
const routes: Routes = [
  { path :'type', component: TypeEditComponent , data: {breadcrumb: 'Type'}},
  { path :'type-edit/:id', component: TypeEditComponent , data: {breadcrumb: 'Type-Edit'}},
  { path :'type-create', component: TypeEditComponent , data: {breadcrumb: 'Type-Create'}},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TypeRoutingModule { }
