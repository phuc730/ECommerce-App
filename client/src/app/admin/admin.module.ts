import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import {AdminComponent} from './admin.component'
import { SharedModule } from '../shared/shared.module';
import {BrandModule} from './brand/brand.module'
import {ProductModule} from './product/product.module'
import {TypeModule} from './type/type.module'
import {TypeComponent} from './type/type.component'
import { from } from 'rxjs';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <== add the imports!
@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    BrandModule,
    ProductModule,
    TypeModule
    ]
})
export class AdminModule { }
