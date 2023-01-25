import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './display/filter/filter.component';
import { DisplayComponent } from './display/display.component';
import { ApiCallService } from '../api-call.service';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FilterComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    DisplayComponent
  ],
  providers: [
    ApiCallService
  ]
})
export class WorldNewsModule { }
