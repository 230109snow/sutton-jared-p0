import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { DisplayComponent } from './display/display.component';



@NgModule({
  declarations: [
    FilterComponent,
    DisplayComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorldNewsModule { }
