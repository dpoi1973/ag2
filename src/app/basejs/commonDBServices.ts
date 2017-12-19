
const ENDPOINT_URI = '/api/remote/';
const APPNAME = 'Quanqiuauto';
const APPURL = '/api/parameter';
const APPAPI = '/api';
const APP = '/api/company';
import baseRESTServices from '../basejs/baserest';
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

@Injectable()
export class CommonUtilsLoopbackServices extends baseRESTServices {
  constructor(public http: Http) {
    super(http);
  //  this.APPAPI = APPAPI;
  }

  getSearchList(modelName, wherecondition) {
    const searchmodel = {applicationName: APPNAME, gridModelName: modelName};
    const url = `${ENDPOINT_URI}${modelName}?filter=${encodeURI(JSON.stringify(wherecondition))}`;
    return this.doGet(url);
  }
  getSearchListgaisandan(modelName, wherecondition) {
    const searchmodel = {applicationName: APPNAME, gridModelName: modelName};
    const url = `${ENDPOINT_URI}${modelName}`;
    return this.doGet(url);
  }
  getSearchListcompany(Modelname, condition) {
    return  this.http.post(`${APPAPI}/${Modelname}/searchby`, condition)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  getSearchCount(modelName, wherecondition) {
    const searchmodel = {applicationName: APPNAME, gridModelName: modelName};
    const url = `${ENDPOINT_URI}${modelName}/count?where=${encodeURI(JSON.stringify(wherecondition))}`;
    return this.doGet(url);
  }
  getSearchListpara(modelName, wherecondition) {
    const searchmodel = {applicationName: APPURL, gridModelName: modelName};
    const url = `${APPURL}/api/${modelName}?filter=${encodeURI(JSON.stringify(wherecondition))}`;
    return this.doGet(url);
  }
  getSearchCountpara(modelName, wherecondition) {
    const searchmodel = {applicationName: APPURL, gridModelName: modelName};
    const url = `${APPURL}/api/${modelName}/count?where=${encodeURI(JSON.stringify(wherecondition))}`;
    return this.doGet(url);
  }

  // updateDetailByModelName(Modelname, model) {

  // }

  sendvalidatevalue(modelname, modelvalue) {
    // const defer = this.$q.defer();
    // this.$http.get(`${APPAPI}/Formhead/validate?value=${modelvalue}&id=${modelname}`).then(resp => {
    //   defer.resolve(resp);
    // }, err => {
    //   defer.reject(err);
    // });
    // return defer.promise;
  }

  getDetailbyiModelId(modelName, id, filter) {
    const searchmodel = {applicationName: APPNAME, gridModelName: modelName};
    const url = `${ENDPOINT_URI}${modelName}s/${id}?filter=${encodeURI(JSON.stringify(filter))}`;
    return this.doGet(url);
  }

  deletedetailByModelName(ModelNamedetail, id) {
    const searchmodel = {applicationName: APPNAME, gridModelName: ModelNamedetail};
    const url = `${ENDPOINT_URI}${ModelNamedetail}s/${id}`;
    return this.dodelete(url);
  }
  deletedetailcarByModelName(ModelNamecardetail, id) {
    const searchmodel = {applicationName: APPNAME, gridModelName: ModelNamecardetail};
    const url = `${ENDPOINT_URI}${ModelNamecardetail}s/${id}`;
    return this.dodelete(url);
  }
//   putDetailbyModelName(Modelname) {
//    return this.http.post(`${ENDPOINT_URI}${Modelname}s/  `)
//             .toPromise()
//             .then(this.extractData)
//             .catch(this.handleError);
//   }
//     // const searchmodel = {applicationName: this.APPNAME, gridModelName: ModelNamecardetail};
//     // const url = `${ENDPOINT_URI}${ModelNamecardetail}s/${id}`;
//     // const defer = this.$q.defer();
//     // return this.dodelete(url);
//   putDetailinfobyModelName(ModelNamedetail) {
//     return  this.http.post(`${ENDPOINT_URI}${ModelNamedetail}s/replaceOrCreate`)
//             .toPromise()
//             .then(this.extractData)
//             .catch(this.handleError);
//   }
  putDetailbyModelNamepar(Modelname, id, model) {
    return  this.http.put(`${APPURL}/api/${Modelname}/${id}`, model).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  putDetailbyModelNameparcar(Modelname, id, model) {
    return  this.http.put(`${APPURL}/api/${Modelname}/putmodel/${id}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  createDetailByModelName(modelName, whereuid, data) {
    const searchmodel = {applicationName: APPNAME, gridModelName: modelName};
    const url = `${ENDPOINT_URI}${modelName}s/upsertWithWhere/?where=${encodeURI(JSON.stringify(whereuid))}`;
    return this.doPost(url, data);
  }
  createDetailywinfoByModelName(ModelNamedetail, whereparid, data) {
    const searchmodel = {applicationName: APPNAME, gridModelName: ModelNamedetail};
    const url = `${ENDPOINT_URI}${ModelNamedetail}s/upsertWithWhere/?where=${encodeURI(JSON.stringify(whereparid))}`;
    return this.doPost(url, data);
  }
  createDetailcarByModelName(ModelNamecardetail, whereparid, data) {
    const searchmodel = {applicationName: APPNAME, gridModelName: ModelNamecardetail};
    const url = `${ENDPOINT_URI}${ModelNamecardetail}s/upsertWithWhere/?where=${encodeURI(JSON.stringify(whereparid))}`;
    return this.doPost(url, data);
  }
  addDetailywinfoByModelName(ModelNamedetail, data) {
    const searchmodel = {applicationName: APPNAME, gridModelName: ModelNamedetail};
    const url = `${ENDPOINT_URI}${ModelNamedetail}s/replaceOrCreate`;
    return this.doPost(url, data);
  }

  addDetailcarByModelName(ModelNamecardetail, data) {
    const searchmodel = {applicationName: APPNAME, gridModelName: ModelNamecardetail};
    const url = `${ENDPOINT_URI}${ModelNamecardetail}s/replaceOrCreate`;
    return this.doPost(url, data);
  }
}


