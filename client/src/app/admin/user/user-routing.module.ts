import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserEditComponent} from './user-edit/user-edit.component'
import {UserComponent} from './user.component'
const routes: Routes = [
  { path :'user', component: UserComponent , data: {breadcrumb: 'User'}},
  { path :'user-edit/:id', component: UserEditComponent , data: {breadcrumb: 'User-Edit'}},
  { path :'user-create', component: UserEditComponent , data: {breadcrumb: 'User-Create'}},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
