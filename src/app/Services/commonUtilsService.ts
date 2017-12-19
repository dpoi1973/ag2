import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

const APPAPI = '/api';
const APPURL = '/api/remote';
import baseRESTService from '../basejs/baserest';

@Injectable()
export class CommonUtilsServices extends baseRESTService {
  // @ngInject
  public APPAPI : any;
  constructor(public http: Http) {
    super(http);
    this.APPAPI = APPAPI;
  }

  getCompanylistSearch(condition,Modelname): Promise<any> {
    return this.http.post(`${APPAPI}/api/${Modelname}?filter=${encodeURI(condition)}`, condition)
                  .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }
  // 获取model的查询列表
  getSearchList(Modelname, condition) {
    return this.http.post(`${APPAPI}/${Modelname}/searchby`, condition)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  getSearchListpara(Modelname, condition) {
    return this.http.post(`${APPURL}/api/${Modelname}/searchby`, condition)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  createDetailByModelName(Modelname, model) {
    return this.http.post(`${APPAPI}/${Modelname}`, model)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  updateDetailByModelName(Modelname, model) {
    return this.http.post(`${APPAPI}/${Modelname}/${model.id}`, model)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  deleteDetailByModelName(Modelname, id) {
    return this.http.delete(`${APPAPI}/${Modelname}/${id}`)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  // // putDetailbyModelName(Modelname, id, model) {
  // //   // @ngInject
  // //   const defer = this.$q.defer();
  // //   this.$http.put(`${APPURL}/api/${Modelname}/${id}`, model).then(resp => {
  // //     defer.resolve(resp);
  // //   }, err => {
  // //     defer.reject(err);
  // //   });
  // //   return defer.promise;
  // // }

  sendvalidatevalue(modelname, modelvalue) {
    return this.http.get(`${APPAPI}/Formhead/validate?value=${modelvalue}&id=${modelname}`)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  getDetailbyiModelId(Modelname, id) {
    return this.http.get(`${APPAPI}/${Modelname}/${id}`)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  // // 获取model的查询列表
  getYWdetail(condition) {
    return this.http.post(`${APPAPI}/Ywinfo/getywdetail`, condition)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  getformheadtemplatevalidate(templatename) {
    return this.http.get(`${APPAPI}/templateformhead/getMubanObj?name=${templatename}`)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  sned(id) {
    return this.http.get(`${APPAPI}/Formhead/send`, id)
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
}

//  const CommonUtilsService = CommonUtilsServices;
