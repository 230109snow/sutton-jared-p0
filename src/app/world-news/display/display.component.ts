import { Component } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { param, apicallinfo } from 'src/models/api-call-info';

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  constructor (private apicall : ApiCallService) {}

  GetWorldNews(paramArr : Array<param>) {
    const apiUrl : string = "https://api.apilayer.com/world_news/search-news";
    const qStr : string = this.apicall.genParamStr(paramArr);
    const args : apicallinfo = this.apicall.genAPICallInfo(apiUrl, qStr);
    this.apicall.getAPI(args).subscribe((dat) => {

      //TODO - DO STUFF WITH RESPONSE
      console.log(dat);
    });
  }

}
