import { Component } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { param, apicallinfo } from 'src/models/api-call-info';
import { worldNewsResponse_story } from '../../../models/worldnews-fmts';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  constructor (private apicall : ApiCallService) {}

  _main_content : worldNewsResponse_story[] = [];

  GetWorldNews(paramArr : Array<param>) {
    const apiUrl : string = "https://api.apilayer.com/world_news/search-news";
    const qStr : string = this.apicall.genParamStr(paramArr);
    const args : apicallinfo = this.apicall.genAPICallInfo(apiUrl, qStr);
    this.apicall.getAPI(args).subscribe((dat) => {
      console.log(`Retrieved ${dat.number} (stories ${1 + dat.offset} through ${1 + dat.offset + dat.number}) out of ${dat.available} available stories.`);

      let newsStories = dat.news ;
      this._main_content = newsStories as Array<worldNewsResponse_story>;
    });
  }
  getSourceFromURL(urlStr : string | undefined) : string {
    let url : URL = new URL(urlStr? urlStr : '');
    return url.hostname;
  }
}
