import { Component, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {

  constructor() {}
  //NOTE display.component.html needs access to filterFG, so it was moved to display.component.ts
  //TODO How can i let DisplayComponent interact with the filter values in this component?
  //@Output() filterUpdated = new EventEmitter<void>();
  //filterFG : FormGroup = new FormGroup({})
  //TODO also maybe: add offset form input? could label it "Skip stories" or something?

  //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  //> News filter parameters for World News API:
  _number : number = 1;
  _offset : number = 0;
  _sort : string = 'publish-time'; // publish-time | sentiment
  _sort_direction : string = 'asc'; // asc | dec
  
  _min_sentiment : number = -1; // [-1, 1]
  _max_sentiment : number = 1;  // [-1, 1]
  _text : string = "";
  _entities : string = ""; // eg ORG:Tesla

  _authors : string = ""; // comma sep list
  _news_sources : string = "";
  _source_countries : string = "";
  _language : string = "en";
  //_location_filter : string = "";

  minLookback() : Date {
    let dt = new Date();
    dt.setHours(0);
    dt.setMinutes(0);
    dt.setSeconds(0);
    dt.setMilliseconds(0);
    return dt;
  }
  // Greatest (latest) lower bound for earliest-publish-date:
  earliest_pd_GLB : Date = this.minLookback();
  _earliest_publish_date : string = this.earliest_pd_GLB.toISOString();

  // Least Upper bounds on availiable publish dates (i.e. right now):
  //pd_LUB : Date = new Date();
  //_latest_publish_date : string = this.pd_LUB.toISOString();
}
