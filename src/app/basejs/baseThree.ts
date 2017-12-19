import {Injectable} from '@angular/core';
import {GridOptions} from 'ag-grid/main';

import {GridOptionServices} from '../Services/gridOptionServices';
import {CommonServices} from '../Services/commonService';

@Injectable()
export default class baseGridTreeComService {
  public ModelName : any;
  public searchCondition : any;
  public selectRow : any;
  private errorMessage: any
  public gridOptions: GridOptions;
  public totalpagesize : number;
  public pageindex : number;

  constructor(modelname,public GridOptionService : GridOptionServices,public CommonServices: CommonServices) {
    this.ModelName = modelname;
    this.GridOptionService = GridOptionService;
    this.CommonServices = CommonServices;
    this.searchCondition = {condition: {}, pageIndex: 1, pageSize: 20};
    this.selectRow = {};
    this.init();
  }
  private init() {
    this.gridOptions = <GridOptions>{
        enableSorting: true,
        enableFilter: true,
        suppressRowClickSelection: true,
        // enableColResize :true,
        rowHeight :50,
        // enableCellChangeFlash :true,
        // enableStatusBar :true,
        enableRangeSelection :true,
        suppressPaginationPanel: true,
        groupSelectsChildren: true,
        columnDefs: [],
        pagination: true,
        defaultColDef:{
            editable: true,
            // enableRowGroup:true,
            // enablePivot:true,
            // enableValue:true
        }
    };
    this.initGridAPI();
  }

public paginationChanged(goways,pageindex,pageSize,page) {
      if(goways=='onBtFirst'){
          this.searchCondition.pageIndex = 1;
          this.search();
          return 1;
      }else if(goways=='onBtLast'){
        if(pageindex<=2){
          this.searchCondition.pageIndex = 1;
          this.search();
          return 1;
        }else{
          this.searchCondition.pageIndex =  pageindex - 1;
          this.searchCondition.pageSize = pageSize;
          this.search();
          return pageindex - 1;
        }
      }else if(goways=='onBtNext'){
        if(pageindex>=(page-1)){
          this.searchCondition.pageIndex =  page;
          this.search();
          return page;
        }else{
          this.searchCondition.pageIndex =  pageindex + 1;
          this.searchCondition.pageSize = pageSize;
          this.search();
          return pageindex + 1;
        }
      }else if(goways=='onBtFinal'){
        this.searchCondition.pageIndex = page;
        this.search();
        return page;
      }
      
    };

public afterinitgrid(ii){}

  public search() {
    this.CommonServices.getSearchList(this.ModelName, this.searchCondition)
    .then(
      data => {
          console.log(data.datas);
          this.gridOptions.api.setRowData(data.datas);
          this.totalpagesize = parseInt(data.totalCount);
          this.afterinitgrid(parseInt(data.totalCount))
        })
    .catch(
      error =>  this.errorMessage = <any>error
    );
  }

 


  public initGridAPI() {
    const pp = this;
      pp.initgridopion(this.GridOptionService);
      pp.search();
  }

    initgridCellTemplate(columelist) : any {
        return ''
    }

   public trans(columelist): any {
       var pp =[];
    for(var i=0;i<columelist.length;i++){
        var ll = {
            headerName:'',
            field: '',
            width: 200
            // editable:true
        };
            ll.headerName =  columelist[i].name;
            ll.field = columelist[i].field;
            pp.push(ll);
    }
    return pp
    }
  public initgridopion(GridOptionService) {
    const tthis = this;
    GridOptionService.getModelOpitons(this.ModelName).then(data => {
      if (data.result) {
            data.result = tthis.trans(data.result)
            tthis.initgridCellTemplate(data.result);
            this.gridOptions.api.setColumnDefs(data.result);
        }
    });
  }



    deleteone(callback) {
      this.CommonServices.deleteDetailByModelName(this.ModelName, this.selectRow.id).then(obj => {
        callback(null, "ok");
      }).catch(err => {
        callback(err, "err");
      });
    }
    // detailall(callback) {
    //   for (let i = 0; i < this.gridApi.selection.getSelectedRows().length; i++) {
    //     this.CommonServices.deleteDetailByModelName(this.ModelName, this.gridApi.selection.getSelectedRows()[i].id).then(obj => {
    //       callback(obj, "ok");
    //     }).catch(err => {
    //       callback(err, "err");
    //     });
    //   }
    // }
          /*eslint-disable*/
  open(verb, url, data, target) {
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

