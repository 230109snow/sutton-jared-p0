import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  @Output() filterUpdated = new EventEmitter<void>();

  filterFG : FormGroup = new FormGroup({
    numberFC: new FormControl('', [
      Validators.required, 
      Validators.min(1), 
      Validators.max(10)
    ])
    //
  })
}
