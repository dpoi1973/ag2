const ENDPOINT_URI = '/api/remote/';
const APPNAME = 'Quanqiuauto';
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class GridOptionServices {
  // @ngInject
  private APPNAME:any
  private ENDPOINT_URI:any
  constructor(public http: Http) {
    this.http = http;
    this.APPNAME = APPNAME;
    this.ENDPOINT_URI = ENDPOINT_URI;
  }
  getModelOpitons(modelname) {
    const searchmodel = {applicationName: this.APPNAME, gridModelName: modelname};
    return this.http.get(`${this.ENDPOINT_URI}gridoptions/getoptionsbyModel?modelName=${encodeURI(JSON.stringify(searchmodel))}`).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }
  searchbyCondition(modelname, wherecondition) {
    const searchmodel = {applicationName: this.APPNAME, gridModelName: modelname};
    return this.http.get(`${this.ENDPOINT_URI}${modelname}s?filter=${encodeURI(JSON.stringify(wherecondition))}`).toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }
  getDetailbyID(modelname, ID) {
    const searchmodel = {applicationName: this.APPNAME, gridModelName: modelname};
    return this.http.get(`${this.ENDPOINT_URI}${modelname}s/${ID}`).toPromise()
                  .then(this.extractData)
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

// export const GridOptionService = GridOptionServices;
