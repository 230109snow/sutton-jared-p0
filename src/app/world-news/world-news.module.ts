import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { DisplayComponent } from './display/display.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { ApiCallService } from '../api-call.service';



@NgModule({
  declarations: [
    FilterComponent,
    DisplayComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FilterComponent
  ],
  providers: [
    ApiCallService
  ]
})
export class WorldNewsModule { }
