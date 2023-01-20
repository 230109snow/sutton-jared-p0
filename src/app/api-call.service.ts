import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

//import { apilayer_key } from 'src/apiKeys';

interface attributekey {
  lbl: string;
}
interface param extends attributekey {
  vals: Array<string | number>;
}
interface APICallFunc {
  (calldat: apicallinfo): Observable<any>;
}
interface apicallinfo {
  url : string;
  options?: object;
}

@Injectable({
  providedIn: 'root'
})
export class ApiCallService {

  constructor(private http : HttpClient) { }

  // to convert an array to a url-compatible parameter string component:
  valarr_to_paramstr(valarr : Array<string | number>) : string {
    let paramstr : string = "";
    for(let val of valarr) {
      if(typeof(val)=="string") {
        val = val.replace(/^\s*/g, '');
        val = val.replace(/\s*$/g, '');
        val = val.replace(/\s{2,}/g, ' ');
        //val = val.replace(/\s*,\s*/g, '%2C');
        //val = val.replace(/\s/g, '%20');
        //val = val.replace('/', '%2F');
        //val = val.replace(':', '%3A');*/
      }
      if(paramstr && val) {paramstr+=',';}
      paramstr+=String(val);
    }
    return encodeURIComponent(paramstr);
  }

  // note that the below paramstr doesnt include the initial "?"
  genParamStr(paramValarrPairs: Array<param>) : string {
    let resstr = ""
    paramValarrPairs.forEach((p, i) => {
      const querystrcomponent = this.valarr_to_paramstr(p.vals);
      if(querystrcomponent) {
        resstr+=`${resstr ? "&" : ""}${p.lbl}=${querystrcomponent}`;
      }
    })
    return resstr;
  }
  /*eg

    ParameterArray = [{
        lbl : "key1",
        vals : ["val1", "val2"]
      },
      {
        lbl : "key2",
        vals : [1, 7, 49]
      }
    ]
  
  */
  genAPICallInfo(apiurl : string, querystring : string | Array<param>, headerinfo?: object, payloadinfo?: object) : apicallinfo {
    let qstr : string;
    if(typeof(querystring)!="string" && querystring) {
      qstr = this.genParamStr(querystring);
    } else {qstr = querystring;}
  
    let res = {
      url: `${apiurl}${qstr? "?" : ""}${qstr? qstr : ""}`
    }
    let optarg : object = {};
    if(headerinfo || payloadinfo) {
      if(headerinfo) {
        Object.defineProperty(optarg, "headers", headerinfo);
      }
      if(payloadinfo) {
        Object.defineProperty(optarg, "payload", payloadinfo);
      }
    }
    if(optarg) {Object.defineProperty(res, "options", optarg);}

    return res
  }

  getAPI : APICallFunc = (info : apicallinfo) => {
    return this.http.get(info.url, info.options? info.options : {});
  }

}
