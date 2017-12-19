import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

@Injectable()
export default class baseRESTService {

  constructor (public http: Http) {

  }
  public doGet(geturl): Observable<any> {
    // console.log(geturl)
    return this.http.get(geturl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  dodelete(geturl) {
    return this.http.delete(geturl)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  doPost(posturl, postdata): Observable<any> {
    return this.http.post(posturl, postdata)
                    .map(this.extractData)
                    .catch(this.handleError);
  }


   public extractData(res: Response) {
    let body = res.json();
    // console.log(body);
    return body || { };
  }

    public handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
 

