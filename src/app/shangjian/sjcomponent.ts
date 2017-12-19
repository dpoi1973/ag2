import { Component,AfterViewInit } from '@angular/core';
import {NgClass} from '@angular/common';
import {CommonServices} from '../Services/commonService';
import {GridOptions} from 'ag-grid/main';
import baseGridTreeComService from '../basejs/baseThree';
import {GridOptionServices} from '../Services/gridOptionServices';
import { Router, ActivatedRoute } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker'


@Component({
  selector: 'fountain-sjcomponent',
  template: require('./sjcomponent.html'),
  providers:[GridOptionServices,CommonServices]
})
export class SJcomponent extends baseGridTreeComService implements AfterViewInit{
  public test: any;
  private myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd.mm.yyyy',
    };
  private dt : any;
  private enddt : any;
  public page: number;
  public pagesize: number;
  public totalpagesize: number;

constructor(public GridOptionService : GridOptionServices, public CommonServices :CommonServices,private route: ActivatedRoute, private router: Router) {
    super('dcl_b_io_decl', GridOptionService, CommonServices);
    // this.CommonServices.dologin('admin','admin1234').then(pp => {console.log('login ok')}).catch(err => {console.log(err)})
    this.dt = '';
    this.enddt = '';
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};//createdAt: {startdate: '', enddate: ''}
  }
  

ngAfterViewInit() {
    this.gridOptions.api.sizeColumnsToFit();
    this.page = this.searchCondition.pageIndex;
  }

afterinitgrid(dd){
    this.totalpagesize = dd;
    this.pagesize = Math.ceil(this.totalpagesize/this.searchCondition.pageSize);
    this.gridOptions.api.refreshView()
}

private gg(newpage){
      this.page = this.paginationChanged(newpage,this.page,this.searchCondition.pageSize,this.pagesize);
}

initgridCellTemplate(columelist) {
    columelist[1].cellRenderer= 'group'
    columelist[1].cellRendererParams = {suppressCount: true,checkbox: true,innerRenderer: this.SimpleCellRenderer}
  }
SimpleCellRenderer(params): string{
    return `<a href="/sj/${params.data.id}" routerLinkActive="active">${params.data.Ent_Decl_No} </a>`;
}

   translateDateToStr(dt) {
    if (!dt) {
      return '';
    }
    const dateStr = `${dt.date.year}-${dt.date.month}-${dt.date.day}`;
    return dateStr;
  }
  private Delete() {
      var selectedRowData = this.gridOptions.api.getSelectedRows();
      for(var i=0;i<selectedRowData.length;i++){
            this.CommonServices.deleteDetailByModelName(this.ModelName,selectedRowData[i].id).then(data=>{
                console.log(data);
            }).catch(err => {
                console.log(err);
            })
      }
  }
 private create() {
     return this.router.navigateByUrl('/sj/0');
  }
  public searchby() {
    this.searchCondition.condition = {createdAt: {startdate: this.translateDateToStr(this.dt), enddate: this.translateDateToStr(this.enddt)}};
    this.search()
  }
 
}
