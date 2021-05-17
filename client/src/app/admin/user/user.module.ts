import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {UserComponent} from './user.component'
import { UserRoutingModule } from './user-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { UserEditComponent } from './user-edit/user-edit.component';
import {ShopModule} from '../../shop/shop.module';
import { UserFormComponent } from './user-form/user-form.component'


@NgModule({
  declarations: [UserComponent, UserFormComponent, UserEditComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    ShopModule
  ],
  exports: [
    UserComponent,
  ]
})
export class UserModule { }
