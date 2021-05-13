import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {BrandComponent} from './brand.component'
import { BrandRoutingModule } from './brand-routing.module';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
@NgModule({
  declarations: [BrandComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule,
  ],
  exports: [
    BrandComponent,
  ]
})
export class BrandModule { }
