import {Injectable} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {GridOptionServices} from '../Services/gridOptionServices';
import {CommonUtilsLoopbackServices} from './commonDBServices';

@Injectable()
export default class baseGridComService {
  public ModelName : any;
  public searchCondition : any;
  public selectRow : any;
  private errorMessage: any
  public gridOptions: GridOptions;
  public pageindex : number;

  constructor(modelname,public GridOptionService : GridOptionServices,public CommonUtilsLoopbackServices: CommonUtilsLoopbackServices) {
    this.ModelName = modelname;
    this.GridOptionService = GridOptionService;
    this.CommonUtilsLoopbackServices = CommonUtilsLoopbackServices;
    this.searchCondition = {where: {}, pageIndex: 1, pageSize: 20, limit: 20, skip: 0};
    this.selectRow = {};
    this.init();
  }
  private init() {
    this.gridOptions = <GridOptions>{
        animateRows:true,
        enableSorting: true,
        enableFilter: true,
        suppressRowClickSelection: true,
        enableColResize :true,
        rowHeight :50,
        enableCellChangeFlash :true,
        enableStatusBar :true,
        enableRangeSelection :true,
        suppressPaginationPanel: true,
        groupSelectsChildren: true,
        columnDefs: [],
        pagination: true,
        defaultColDef:{
            editable: true,
            enableRowGroup:true,
            enablePivot:true,
            enableValue:true,
            IHeaderAngularComp : MyHeaderComponent
        }

    };
    this.initGridAPI();
  }


public paginationChanged(goways,pageindex,pageSize,page) {
      if(goways=='onBtFirst'){
          this.searchCondition.skip = 0;
          this.search();
          return 1;
      }else if(goways=='onBtLast'){
        if(pageindex<=2){
          this.searchCondition.skip = 0;
          this.search();
          return 1;
        }else{
          this.searchCondition.skip =  (pageindex - 2) * pageSize;
          this.searchCondition.pageSize = pageSize;
          this.search();
          return pageindex - 1;
        }
      }else if(goways=='onBtNext'){
        if(pageindex>=(page-1)){
          this.searchCondition.skip = (page - 1) * pageSize;
          this.search();
          return page;
        }else{
          this.searchCondition.skip =  (pageindex) * pageSize;
          this.searchCondition.pageSize = pageSize;
          this.search();
          return pageindex + 1;
        }
      }else if(goways=='onBtFinal'){
        this.searchCondition.skip = (page - 1) * pageSize;
        this.search();
        return page;
      }
      
    };

public afterinitgrid(dd){}

  public search() {
    this.CommonUtilsLoopbackServices.getSearchList(this.ModelName, this.searchCondition)
    .subscribe(
      data => {console.log(data);this.gridOptions.api.setRowData(data)},
      error =>  this.errorMessage = <any>error
    );
    this.CommonUtilsLoopbackServices.getSearchCount(this.ModelName, this.searchCondition.where)
    .subscribe(
      data => {this.afterinitgrid(data.count)},
      error =>  this.errorMessage = <any>error
    );
  }

  public searchpara() {
    this.CommonUtilsLoopbackServices.getSearchListpara(this.ModelName, this.searchCondition)
    .subscribe(
      data => this.gridOptions.api.setRowData(data),
      error =>  this.errorMessage = <any>error
    );
    this.CommonUtilsLoopbackServices.getSearchCountpara(this.ModelName, this.searchCondition.where)
    .subscribe(
      data => this.gridOptions.api.paginationSetPageSize(data.count),
      error =>  this.errorMessage = <any>error
    );
  }

  public gridapidselect() {
    const pp = this;
    this.gridOptions.onFilterChanged( function(row){
      const msg = `row selected ${row.isSelected}`;
      if (row.isSelected) {
          pp.selectRow = row.entity;
        } else {
          pp.selectRow = {};
        }
      console.log(pp.selectRow);
    });
  }


  public initGridAPI() {
      const pp = this;
      pp.search();
  }

  

   public initgridCellTemplate(columelist) {// eslint-disable-line
      console.log('super');
      return '';
    }
  public initgridopion(GridOptionService) {
    const tthis = this;
    GridOptionService.getModelOpitons(this.ModelName).then(data => {
      if (data.result) {
         // data.result[0].cellTemplate = tthis.initgridCellTemplate();
          tthis.initgridCellTemplate(data.result);
          tthis.gridOptions.columnDefs = data.result;
        }
    });
  }
 public gridapiupdate() {
    const pp = this;
    pp.gridOptions.onCellEditingStopped((rowEntity, colDef, newValue, oldValue) => {
      pp.CommonUtilsLoopbackServices.putDetailbyModelNamepar(this.ModelName, rowEntity.id, rowEntity).then(data => {
          console.log(data);
        }).catch(err => {
          alert("修改失败"); //eslint-disable-line
          console.log(err);
        });
      // pp.msg.lastCellEdited = `edited row id:${rowEntity.id} Column:${colDef.name} newValue:${newValue} oldValue:${oldValue}`;
    });
  }
public  gridapiupdatecar() {
    const pp = this;
    pp.gridOptions.onCellEditingStopped((rowEntity, colDef, newValue, oldValue) => {
      console.log(rowEntity);
      pp.CommonUtilsLoopbackServices.putDetailbyModelNameparcar(this.ModelName, rowEntity.id, rowEntity).then(data => {
          console.log(data);
        }).catch(err => {
          alert("修改失败"); //eslint-disable-line
          console.log(err);
        });
      // pp.msg.lastCellEdited = `edited row id:${rowEntity.id} Column:${colDef.name} newValue:${newValue} oldValue:${oldValue}`;
    });
  }
 public initGridAPIedit() {
    const pp = this;
      pp.gridapidselect();
      // pp.sortingpara();
      pp.gridapiupdate();
  }
 public initGridAPIeditcar() {
    const pp = this;
    // pp.gridOptions.onRegisterApi = function (gridApi) {
      // pp.gridApi = gridApi;
      pp.gridapidselect();
      // pp.sortingpara();
      pp.gridapiupdatecar();
    // };
  }

}

