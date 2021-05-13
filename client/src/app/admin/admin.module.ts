import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing.module';
import {AdminComponent} from './admin.component'
import { SharedModule } from '../shared/shared.module';
import {BrandComponent} from './brand/brand.component';
import {BrandModule} from './brand/brand.module'
import { from } from 'rxjs';
import {BrandRoutingModule} from './brand/brand-routing.module'
@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    AdminRoutingModule,
    SharedModule,
    BrandModule,
    ]
})
export class AdminModule { }
