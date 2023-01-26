import { Observable } from 'rxjs';

export interface attributekey {
  lbl: string;
}
export interface param extends attributekey {
  vals: Array<string | number>;
}
export interface apicallinfo {
  url : string;
  options?: object;
}
export interface APICallFunc {
  (calldat: apicallinfo): Observable<any>;
}
