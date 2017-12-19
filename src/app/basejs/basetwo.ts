import {Injectable} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {GridOptionServices} from '../Services/gridOptionServices';
import {CommonServices} from '../Services/commonService';

@Injectable()
export default class baseDetailComponent {
    public ModelName:any;
    public detailInfoData:any;
    public detailInfo:any;
    public detailID:any;
    

  constructor(public CommonUtilsService : CommonServices, ModelName, detailID) {
    this.ModelName = ModelName;
    this.CommonUtilsService = CommonUtilsService;
    this.detailInfoData = {};
    this.detailInfo = {};
    this.detailID = detailID;
  }
  public afterDetailinit() {
  }
  public getdetailinfo() {
    const tthis = this;
    this.CommonUtilsService.getDetailbyiModelId(this.ModelName, this.detailID).then(data => {
        console.log(data);
        for(var key in data){
            if(data[key] == null){
                data[key] = '';
            }
        }
      tthis.detailInfoData = data;
      this.afterDetailinit();
    });
  }
  public getdetailinfoone() {
    const tthis = this;
    this.CommonUtilsService.getDetailbyiModelId(this.ModelName, this.detailID).then(data => {
      tthis.detailInfo = data;
    });
  }
 public savedetailInfo() {
    const tthis = this;
    if (this.detailID > 0) {
      this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        tthis.detailInfoData = data;
      });
    } else {
      delete this.detailInfoData.id;
      this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
        tthis.detailInfoData = data;
      });
    }
  }

 public spxinxisavedetailInfo() {
    const tthis = this;
    if (this.detailID > 0) {
      this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        tthis.detailInfoData = data;
      });
    } else {
      delete this.detailInfoData.id;
      this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
        tthis.detailInfoData = data;
        // this.$state.go('spXinXi.detail', {id: data.data.id});
      });
    }
  }
 public spguileisavedetailInfo() {
    const tthis = this;
    if (this.detailID > 0) {
      this.CommonUtilsService.putDetailbyModelName(this.ModelName, this.detailID, this.detailInfoData).then(data => {
        alert("保存成功！");  // eslint-disable-line no-alert
        tthis.detailInfoData = data;
      });
    } else {
      delete this.detailInfoData.id;
      this.CommonUtilsService.createDetailByModelName(this.ModelName, this.detailInfoData).then(data => {
        alert("创建成功"); //eslint-disable-line
        tthis.detailInfoData = data;
        // this.$state.go('spGuiLei.detail', {id: data.data.id});
      });
    }
  }
 public open(verb, url, data, target) {
    const form = document.createElement("form");
    form.action = url;
    form.method = verb;
    form.target = target || "_self";
    if (data) {
        const input = document.createElement("input");
        input.name = "liwei";
        input.value =  JSON.stringify(data);
        form.appendChild(input); 
    }
    form.style.display = 'none';
    document.body.appendChild(form);
    form.submit();
  }
}
