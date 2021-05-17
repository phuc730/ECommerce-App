import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import {BrandComponent} from './brand.component'
import { BrandRoutingModule } from './brand-routing.module';
import { BrandEditComponent } from './brand-edit/brand-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BandFormComponent } from './band-form/band-form.component'; // <== add the imports!

@NgModule({
  declarations: [BrandComponent,BrandEditComponent, BandFormComponent],
  imports: [
    CommonModule,
    BrandRoutingModule,
    SharedModule
  ],
  exports: [
    BrandComponent,
  ]
})
export class BrandModule { }
