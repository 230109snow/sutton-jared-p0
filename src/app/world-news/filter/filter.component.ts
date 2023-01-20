import { Component } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
  // Greatest (latest) lower bound for earliest-publish-date:
  earliest_pd_GLB : Date = this.minLookback();
  // Least Upper bounds on availiable publish dates, i.e. right now:
  //pd_LUB : Date = new Date();

  _number : number = 1;
  _offset : number = 0;
  _sort : string = 'publish-time'; // publish-time | sentiment
  _sort_direction : string = 'asc'; // asc | dec
  
  _min_sentiment : number = -1; // [-1, 1]
  _max_sentiment : number = 1;  // [-1, 1]
  _text : string = "";
  _entities : string = ""; // eg ORG:Tesla

  _authors : string = ""; // comma sep list

  _earliest_publish_date : string = this.earliest_pd_GLB.toISOString();
  //_latest_publish_date : string = this.pd_LUB.toISOString();
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
}
