import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { param, APICallFunc, apicallinfo } from 'src/models/api-call-info'
import { apilayer_key } from 'src/apiKeys';


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

  // note the below paramstr does NOT include the initial "?"
  genParamStr(paramValarrPairs: Array<param>) : string {
    let resstr : string = "";
    for(let parameter of paramValarrPairs) {
      let p = parameter.lbl;
      let q = parameter.vals;
      if( !q.every((val) => {return val=="";}) ) {
        resstr += `${resstr? "&" : ""}${p}=${this.valarr_to_paramstr(q)}`
      }
    }
    console.log("api-call service generated parameter string:");
    console.log(resstr);
    return resstr;
  }

  genAPICallInfo(apiurl : string, querystring : string | Array<param>) : apicallinfo {

    let qstr : string;
    if(typeof(querystring)!="string" && querystring) {
      qstr = this.genParamStr(querystring);
    } else {qstr = querystring;}
    let res : apicallinfo = {
      url: `${apiurl}${qstr? "?" : ""}${qstr? qstr : ""}`
    }

    if(apiurl.includes('https://api.apilayer.com/')) {
      const h = new HttpHeaders()
        .append('apikey', apilayer_key)
      res['options'] = { 'headers': h }
    }
    //console.log(res);
    return res
  }
  getAPIx = (info : apicallinfo) => {
    console.log(`url = ${info.url}`);
    console.log(`opt = ${info.options}`);
  }
  getAPI : APICallFunc = (info : apicallinfo) => {
    return this.http.get(info.url, info.options? info.options : {});
  }

}
