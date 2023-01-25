import { Component } from '@angular/core';
import { ApiCallService } from '../../api-call.service';
import { param } from 'src/models/api-call-info'

@Component({
  selector: 'app-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.css']
})
export class DisplayComponent {

  constructor (private apicall : ApiCallService) {}
  //TODO - change event in display.component.html to actually do API call
  go(arr : Array<param>) {
    console.log(arr);
    console.log(this.apicall.genAPICallInfo("https://api.apilayer.com/world_news/search-news", this.apicall.genParamStr(arr)));
  }

  /* getWorldNews() {
    const args : apicallinfo = apicall.genAPICallInfo("https://api.apilayer.com/world_news/search-news", apicall.genParamStr(<filter info>));
    apicall.getAPI(args);
  }
  */
}
