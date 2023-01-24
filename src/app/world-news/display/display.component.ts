import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {
  @Output() filterUpdated = new EventEmitter<void>();

  //TODO MAYBE THESE VALIDATORS CAN BE MOVED TO filter.component.ts?
  minMaxOrderValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    const maxval = control.get('max_sentimentFC');
    const minval = control.get('min_sentimentFC');

    return maxval && minval && maxval>=minval ? { minMaxMismatch: true } : null;
  };
  validateEntities: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    let errFlag = false;
    const errObj = { invalidEntities: true }
    const standardTypes = ['PER', 'LOC', 'ORG', 'DATE', 'TIME', 'MONEY', 'PERCENT', 'FAC', 'GPE'];
    const vals = control.value;
    const valArray = vals.split(',');

    const ENTITY_REGEXP : RegExp = /^[A-Za-z]{3,8}:[A-Za-z0-9 ]+$/;
    
    for(let untrimmedval of valArray) {
      let val = untrimmedval.trim();

      let isValidFmt = ENTITY_REGEXP.test(val);

      let [type, name] = val.split(':');
      let isValidEntityType = standardTypes.includes(type);

      //console.log(`Value='${val}': Valid Fmt=${isValidFmt}, Valid Entity=${isValidEntityType}`);
      errFlag = (isValidFmt && isValidEntityType) ? errFlag : true;
      if(isValidFmt && isValidEntityType) {continue;} else {errFlag=true;}
    }
    //console.log("Errors?", errFlag);
    return errFlag ? errObj : null;
  };


  filterFG : FormGroup = new FormGroup({
    numberFC: new FormControl('1', [
      Validators.required, 
      Validators.min(1), 
      Validators.max(10)
    ]),
    min_sentimentFC: new FormControl('', [
      Validators.min(-1),
      Validators.max(1)
    ]),
    max_sentimentFC: new FormControl('', [
      Validators.min(-1),
      Validators.max(1)
    ]),
    textFC: new FormControl('', [
      Validators.maxLength(30)
    ]),
    entitiesFC: new FormControl('', [
      this.validateEntities
    ])
    //
  }, { validators: this.minMaxOrderValidator });

  
}
