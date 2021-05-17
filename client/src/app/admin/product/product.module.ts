import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {ProductComponent} from './product.component'
import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { ProductEditComponent } from './product-edit/product-edit.component';
import {ShopModule} from '../../shop/shop.module';
import { ProductFormComponent } from './product-form/product-form.component'

@NgModule({
  declarations: [ProductComponent, ProductFormComponent, ProductEditComponent],
  imports: [
    CommonModule,
    ProductRoutingModule,
    SharedModule
  ],
  exports: [
    ProductComponent,
  ]
})
export class ProductModule { }
