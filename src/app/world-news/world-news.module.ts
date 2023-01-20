import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FilterComponent } from './filter/filter.component';
import { DisplayComponent } from './display/display.component';
import { NavbarComponent } from '../navbar/navbar.component';



@NgModule({
  declarations: [
    FilterComponent,
    DisplayComponent,
    NavbarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class WorldNewsModule { }
