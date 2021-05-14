import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import {AdminComponent} from './admin.component'
import { SharedModule } from '../shared/shared.module';
import {BrandModule} from './brand/brand.module'
import {ProductModule} from './product/product.module'
import { from } from 'rxjs';
@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    BrandModule,
    ProductModule
    ]
})
export class AdminModule { }
