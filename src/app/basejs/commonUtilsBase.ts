const APPAPI = '/api';
import baseRESTServices from '../basejs/baserest';
import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';

// import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/map';

export class CommonUtilsSailsServices extends baseRESTServices {
  public APPAPI : any;
  constructor(public http: Http) {
    super(http);
    this.APPAPI = APPAPI;
  }
// 判断是否登录
  islogin() {
    return this.doGet(`${APPAPI}/User/me`);
  }

// 登录
  dologin(username, password) {
    const aupara = `identifier=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return  this.http.options(`${APPAPI}/auth/local`,{
      method: 'POST',
      url: `${APPAPI}/auth/local`,
      body: aupara,
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }

  // 注册
  doregister(username, password) {
    const aupara = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
   return this.http.options(`${APPAPI}/userregister`,{
      method: 'POST',
      url: `${APPAPI}/userregister`,
      body: aupara,
    //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
    })
    .toPromise()
    .then(this.extractData)
    .catch(this.handleError);
  }
  // 登出
  dologout() {
    return this.doGet(`${APPAPI}/logout`);
  }
  // 获取model的查询列表 要重载
  getSearchList(Modelname, condition) {
    // const defer = this.$q.defer();
    return this.http.post(`${APPAPI}/${Modelname}/searchby`, condition)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 创建一条记录 model
  createDetailByModelName(Modelname, model) {
   return this.http.post(`${APPAPI}/${Modelname}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 更新一条记录
  updateDetailByModelName(Modelname, model) {
    return  this.http.put(`${APPAPI}/${Modelname}/${model.id}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 删除一条记录
  deleteDetailByModelName(Modelname, id) {
     // @ngInject
    return  this.http.delete(`${APPAPI}/${Modelname}/${id}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  putDetailbyModelName(Modelname, id, model) {
    // @ngInject
   return this.http.put(`${APPAPI}/${Modelname}/${id}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
// 校验是否合法
  sendvalidatevalue(modelname, modelvalue) {
   return this.http.get(`${APPAPI}/Formhead/validate?value=${modelvalue}&id=${modelname}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
// 得到model详细信息
  getDetailbyiModelId(Modelname, id) {
    // @ngInject
    return  this.http.get(`${APPAPI}/${Modelname}/${id}`)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
}

const ENDPOINT_URI = '/api/remote/';
const APPNAME = 'Quanqiuauto';

export class CommonUtilsLoopbackServices extends baseRESTServices{

// 判断是否登录
  islogin() {
    return this.doGet(`${APPAPI}/User/me`);
  }

// 登录
  dologin(username, password) {
    const aupara = `identifier=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.options(`${APPAPI}/auth/local`,{
            method: 'POST',
            url: `${APPAPI}/auth/local`,
            body: aupara,
            //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  // 注册
  doregister(username, password) {
    const aupara = `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.http.options(`${APPAPI}/userregister`,{
            method: 'POST',
            url: `${APPAPI}/userregister`,
            body: aupara,
            //   headers: {'Content-Type': 'application/x-www-form-urlencoded'}
            })
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 登出
  dologout() {
    return this.doGet(`${APPAPI}/logout`);
  }
  // 获取model的查询列表 要重载
  getSearchList(Modelname, condition) {
    return  this.http.post(`${APPAPI}/${Modelname}/searchby`, condition)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 创建一条记录 model
  createDetailByModelName(Modelname, model) {
    return  this.http.post(`${APPAPI}/${Modelname}`, model)
            .toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 更新一条记录
  updateDetailByModelName(Modelname, model) {
    return this.http.put(`${APPAPI}/${Modelname}/${model.id}`, model).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  // 删除一条记录
  deleteDetailByModelName(Modelname, id) {
     // @ngInject
    return this.http.delete(`${APPAPI}/${Modelname}/${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
  putDetailbyModelName(Modelname, id, model) {
    // @ngInject
    return this.http.put(`${APPAPI}/${Modelname}/${id}`, model).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
// 校验是否合法
  sendvalidatevalue(modelname, modelvalue) {
   return this.http.get(`${APPAPI}/Formhead/validate?value=${modelvalue}&id=${modelname}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
// 得到model详细信息
  getDetailbyiModelId(Modelname, id) {
    // @ngInject
    return this.http.get(`${APPAPI}/${Modelname}/${id}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  getformheadtemplatevalidate(templatename) {
   return this.http.get(`${APPAPI}/templateformhead/getMubanObj?name=${templatename}`).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }

  sned(id) {
   return this.http.get(`${APPAPI}/Formhead/send`, id).toPromise()
            .then(this.extractData)
            .catch(this.handleError);
  }
}

