import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { param } from 'src/models/api-call-info'

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent implements OnInit{

  @Output() filterSubmit = new EventEmitter<Array<param>>();

  constructor() {}

//$ SOME DEFAULT PARAMETERS:
  //> Sorting strategy and direction:
      //note: must change 'checked' radio in html file to change these
    _sort : string = 'publish-time'; // publish-time | sentiment
    _sort_direction : string = 'asc'; // asc | desc
  //> Language of results:
    _language : string = "en"; //TODO make required (in form validation)?
  //> Max length of text search string:
    _text_maxlen : number = 30;
  //> Number of stories (default & max) to search for:
    _number : number = 1;
    _number_max : number = 10;
  //> [UNIMPLEMENTED] Number of results to skip:
    //TODO maybe: add offset form input? could label it "Skip stories" or something?
    ////_offset : number = 0;
  //> Greatest (latest) lower bound for earliest-publish-date:
    earliest_pd_GLB : Date = this.minLookback();
    _earliest_publish_date : string = this.fmtDateTime(this.earliest_pd_GLB);
  //> [UNIMPLEMENTED] Least (earliest) upper bound for:
    //// Least Upper bounds on availiable publish dates (i.e. right now):
    ////pd_LUB : Date = new Date();
    ////_latest_publish_date : string = this.fmtDateTime(this.pd_LUB);
  //> [UNIMPLEMENTED] Location + radius to search
    ////_location_filter : string = "";
  /*//> REMAINING PARAMETERS ARE JUST FOR REFERENCE
    _text : string = "";
    _entities : string = ""; // eg ORG:Tesla
    // comma sep lists:
    _authors : string = "";
    _news_sources : string = "";
    _source_countries : string = "";
  */
//$

  submitFilterForm() : void {
    if(this.filterFG.invalid) {console.log(this.filterFG.errors); return;}
    const fg = this.filterFG.getRawValue()

    const lbls = ["number", "min-sentiment", "max-sentiment", "text", "entities", "authors", "news-sources", "language", "source-countries", "earliest-publish-date"]//, "offset", "latest-publish-date"]

    // need to initialize these first because they're radio buttons:
    let fgarray : Array<param> = [
      {lbl: "sort", vals: [this._sort]},
      {lbl: "sort-direction", vals: [this._sort_direction]}];
    // then pull rest of values from Form Control:
    for(let p of lbls) {
      let fc = `${p.replaceAll('-', '_')}FC`;
      let paramvals : Array<string | number> = (typeof(fg[fc])=="string") ? fg[fc].split(',').map((x : string) => x.trim()) : [fg[fc]];
      fgarray.push({lbl: p, vals: paramvals})
    }
    this.filterSubmit.emit(fgarray);
  }


  //SECTION - Form Validation
  minMaxOrderValidator: ValidatorFn = (control: AbstractControl): ValidationErrors | null => {
    if( !control ) {return null;}
    const ctrlsNow = control.getRawValue();
    const maxval = ctrlsNow['max_sentimentFC'];
    ////control.get('max_sentimentFC').value;
    const minval = ctrlsNow['min_sentimentFC'];
    ////control.get('min_sentimentFC')?.value;
    // test if both are defined (truthy or 0) and if max and min are backwards:
    return (String(maxval) && String(minval) && maxval<minval) ? { minMaxMismatch: true } : null;
  };
  validateEntities: ValidatorFn = (control: AbstractControl) : ValidationErrors | null => {
    if(control.value=="") {return null;}

    let errFlag = false;
    const errObj = { invalidEntities: true }
    const standardTypes = ['PER', 'LOC', 'ORG', 'DATE', 'TIME', 'MONEY', 'PERCENT', 'FAC', 'GPE'];

    const valArray = control.value.split(',');

    const ENTITY_REGEXP : RegExp = /^[A-Za-z]{3,8}:[A-Za-z0-9 ]+$/;

    for(let untrimmedval of valArray) {
      let val = untrimmedval.trim();
      if(val=="") {continue;} // allows leading/trailing/duplicate commas

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
    numberFC: new FormControl(`${this._number}`, [
      Validators.required,
      Validators.min(1),
      Validators.max(this._number_max)
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
      Validators.maxLength(this._text_maxlen)
    ]),
    entitiesFC: new FormControl('', [
      this.validateEntities
    ]),
    authorsFC: new FormControl('', []),
    news_sourcesFC: new FormControl('', []),
    languageFC: new FormControl(this._language, []),
    source_countriesFC: new FormControl('', []),
    earliest_publish_dateFC: new FormControl(this._earliest_publish_date, [])
  }, { validators: this.minMaxOrderValidator });

  //SECTION - Misc Functions:
  minLookback() : Date {
    let dt = new Date();
    const timezoneOffset : number = - (dt.getTimezoneOffset()/60);
    dt.setHours(timezoneOffset);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }
  fmtDateTime(dt : Date) : string {
    dt.setMilliseconds(0);
    let dtstr : string = dt.toISOString()
    return dtstr.replace(/\.[0-9]{3}Z$/, '')
  }

  //SECTION - Event Handling Functions
  onRadioChange(evt : any) {
    switch(evt.target.name) {
      case "sort direction": {
          this._sort_direction = evt.target.value;
          break;
      }
      case "sort by": {
          this._sort = evt.target.value;
          break;
      }
      default: {
          console.log("Something went very wrong.");
          break;
      }
    }
  }

  ngOnInit() : void {
    //
  }
}
