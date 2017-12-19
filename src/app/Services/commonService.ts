import { Injectable }              from '@angular/core';
import { Headers, Http, Response,RequestOptions }          from '@angular/http';


import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

const APPAPI = '/api';
const APPURL = '/api/remote';
import baseRESTService from '../basejs/baserest';

@Injectable()
export class CommonServices extends baseRESTService{
  // @ngInject
  private tokeyKey = "token";
  private token: string;
  public APPAPI : any;
  constructor(public http: Http) {
    super(http);
    this.http = http;
    this.APPAPI = APPAPI;
  }

  islogin() {
    return this.doGet(`${APPAPI}/wechat/me`);
  }

 dologin(username, password) : Promise<any[]>{
    let headers = new Headers({ 'Content-Type': 'application/x-www-form-urlencoded' });
    let options = new RequestOptions({ headers: headers});
        const aupara = `identifier=${username}&password=${password}`;
        const body = {condition:{HSCode:'',GName:''},pageIndex:1,pageSize:20};
        return this.http.post(`${APPAPI}/auth/local`,aupara,options)
        .toPromise()
        .then(this.extractData).catch(this.handleError);
  }
  
    dologout() {
        return this.doGet(`${APPAPI}/wechat/logout`);
    }


getCompanylistSearch(condition,Modelname): Promise<any> {
    return this.http.post(`${APPAPI}/api/${Modelname}?filter=${encodeURI(condition)}`, condition)
                  .toPromise()
                  .then(this.extractData)
                  .catch(this.handleError);
  }
  // 获取model的查询列表
  getSearchList(Modelname, condition) {
        let headers = new Headers({ 'Content-Type': 'application/json' });
        return this.http.post(`${APPAPI}/${Modelname}/searchby`, condition,{headers:headers})
        .toPromise()
        .then(this.extractData)
        .catch(this.handleError);
    }


  createDetailByModelName(Modelname, model) {
   return  this.http.post(`${APPAPI}/${Modelname}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  
  updateDetailByModelName(Modelname, model) {
    return  this.http.put(`${APPAPI}/${Modelname}/${model.id}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  deleteDetailByModelName(Modelname, id) {
    return  this.http.delete(`${APPAPI}/${Modelname}/${id}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  putDetailbyModelName(Modelname, id, model) {
    return this.http.put(`${APPAPI}/${Modelname}/${id}`, model)
    .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  sendvalidatevalue(modelname, modelvalue) {
    return this.http.get(`${APPAPI}/Formhead/validate?value=${modelvalue}&id=${modelname}`)
    .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  getDetailbyiModelId(Modelname, id) {
   return this.http.get(`${APPAPI}/${Modelname}/${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  // 获取model的查询列表
  getYWdetail(condition) {
   return this.http.post(`${APPAPI}/Ywinfo/getywdetail`, condition).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  getformheadtemplatevalidate(templatename) {
   return this.http.get(`${APPAPI}/templateformhead/getMubanObj?name=${templatename}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  send(id) {
  return  this.http.get(`${APPAPI}/Formhead/send`, id).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  attachcust(id) {
  return  this.http.get(`${APPAPI}/CustProductDetailInfo/attachcust?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  attachcustcopy(Modelname, id) {
  return  this.http.get(`${APPAPI}/${Modelname}/attachcust?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  confirmtopro(Modelname, id) {
  return  this.http.get(`${APPAPI}/${Modelname}/confirmtopro?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  reconfirm(id) {
  return  this.http.get(`${APPAPI}/CustProductDetailInfo/reconfirm?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  fillcspec(id) {
  return  this.http.get(`${APPAPI}/CustClassifyProductInfo/fillcspec?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  fillprodetail(id) {
  return  this.http.get(`${APPAPI}/CustClassifyProductInfo/fillprodetail?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  copyHsconfig(id) {
  return  this.http.get(`${APPAPI}/CustClassifyProductInfo/copyHsconfig?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  fillallprodetail() {
  return  this.http.get(`${APPAPI}/CustClassifyProductInfo/fillallprodetail`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  fillpracname(custid) {
  return  this.http.get(`${APPAPI}/CustClassifyProductInfo/fillpracname?id=${custid}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  syntemj(Modelname, custid) {
  return  this.http.get(`${APPAPI}/${Modelname}/syntemj?id=${custid}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  syntemjlocal(Modelname, custid) {
   return this.http.get(`${APPAPI}/${Modelname}/syntemjlocal?id=${custid}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  syntemjlocalsingle(Modelname, id) {
   return this.http.get(`${APPAPI}/${Modelname}/syntemjlocalsingle?id=${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  saveopetempjson(id, json) {
  return  this.http.post(`${APPAPI}/CustProductDetailInfocopy/saveopetempjson?id=${id}`, json).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  refreshmd5andlink() {
  return  this.http.get(`${APPAPI}/CustProductDetailInfocopy/refreshmd5andlinksql`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  confirmtoprototal() {
  return  this.http.get(`${APPAPI}/CustProductDetailInfocopy/confirmtoprototal`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  fillallcspec(custid) {
  return  this.http.get(`${APPAPI}/CustClassifyProductInfo/fillallcspec?id=${custid}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
}

   public extractData(res: Response) {
    let body = res.json();
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