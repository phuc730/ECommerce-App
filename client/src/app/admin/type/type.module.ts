import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TypeComponent} from './type.component'
import { TypeRoutingModule } from './type-routing.module';
import { SharedModule } from '../../shared/shared.module';
import { TypeFormComponent } from './type-form/type-form.component';
import {TypeEditComponent} from './type-edit/type-edit.component'

@NgModule({
  declarations: [TypeComponent, TypeFormComponent, TypeEditComponent],
  imports: [
    CommonModule,
    TypeRoutingModule,
    SharedModule
  ],
  exports: [
    TypeComponent,
  ]
})
export class TypeModule { }
