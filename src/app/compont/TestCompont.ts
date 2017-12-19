import {Component, AfterViewInit,OnInit,ViewChild} from '@angular/core';
import {NgClass} from '@angular/common';
import {GridOptions} from 'ag-grid/main';
import {TestCompontDetail} from './TestCompontDetail';
import {TestComponent} from '../test/test'
import baseGridComService from '../basejs/baseGrid';
import {GridOptionServices} from '../Services/gridOptionServices';
import {CommonUtilsLoopbackServices} from '../basejs/commonDBServices';
import { SelectComponent } from 'ng2-select'

@Component({
  selector: 'fountain-testcompont',
  template: require('./TestCompont.html'),
  providers:[GridOptionServices,CommonUtilsLoopbackServices]
})
export class TestCompont extends baseGridComService implements AfterViewInit,OnInit {
  @ViewChild('recipientsInput') recipientsInput: SelectComponent
  private commonUtilsLoopbackService : any;
  public page: number;
  public pagesize: number;
  public totalpagesize: number;
  private items:Array<string> = ['Amsterdam', 'Vienna', 'Vilnius', 'Warsaw', 'Wrocław','Zagreb', 'Zaragoza', 'Łódź'];
  private value : any;
  constructor(public GridOptionService : GridOptionServices, public CommonUtilsLoopbackService :CommonUtilsLoopbackServices) {
    super('decmodheads', GridOptionService, CommonUtilsLoopbackService);
    this.commonUtilsLoopbackService = CommonUtilsLoopbackService;
    this.gridOptions.rowSelection = 'multiple'
    this.searchCondition = {where: {}, pageIndex: 1, pageSize: 20, limit: 20};
     this.gridOptions.columnDefs = [
                {headerName: 'EntryId', field: 'EntryId', width: 150,cellRenderer: 'group',cellRendererParams: {suppressCount: true,checkbox: true,innerRenderer: this.SimpleCellRenderer}},
                {headerName: 'DecModSeqNo', field: 'DecModSeqNo', width: 150, editable: true, valueParser: this.numberValueParser},
                {headerName: 'DecSeqNo', field: 'DecSeqNo', width: 150, editable: false, cellRenderer: this.GenderCellRenderer, cellEditor: 'richSelect',
                cellEditorParams: {
                    cellRenderer: this.GenderCellRenderer,
                    values: [{name: 'Ireland', code: 'IE'},
                {name: 'UK', code: 'UK'},
                {name: 'France', code: 'FR'}]
                }},
                {headerName: 'DecModNote', field: 'DecModNote', width: 250,editable: false},
                {headerName: 'EntOpName', field: 'EntOpName', width: 80,editable: true},
                {headerName: 'EntOpTele', field: 'EntOpTele', width: 100},
                {headerName: 'FeedDept', field: 'FeedDept', width: 80},
                {headerName: 'ObjectID', field: 'ObjectID', width: 180},
                {headerName: 'Update_Time', field: 'Update_Time', width: 180},
                {headerName: 'User_Name', field: 'User_Name', width: 80}
    ];
     this.gridOptions.onGridReady = () => {
                this.pagesize = Math.ceil(this.totalpagesize/this.searchCondition.pageSize);
            };
    this.gridOptions.onRowEditingStarted = (event) => {
        console.log('never called - not doing row editing');
    }
    this.gridOptions.onCellClicked = (event) => {
        console.log(event);
    }
  }

public numberValueParser(params){
  console.log(params);
}

private GenderCellRenderer(params) {
    return params.value.name;
}

public SimpleCellRenderer(params){
  console.log(params.data)
  return `<a href="/gaidan/${params.data.EntryId}" routerLinkActive="active">${params.data.EntryId} </a>`;
}

  public ngOnInit() {
    const pthis = this;
    pthis.items.push(`123123`);
    this.recipientsInput.items=['12','23']
  }

  public isFullWidthCell(rowNode) {
    return rowNode.level === 1;
  }

  private selected(value:any) {
    console.log('Selected value is: ', value);
  }

  private removed(value:any) {
    console.log('Removed value is: ', value);
  }

  private typed(value:any) {
    this.recipientsInput.items = ['2'];
    (<any>this.recipientsInput).open();
    console.log('New search input: ', value);
  }

  private refreshValue(value:any) {
    this.value = value;
  }


 private dosearch(keyword) {
    if(keyword == undefined){ //eslint-disable-line
      return;
    }
    this.searchCondition.where = {EntOpName: keyword};
    this.search();
  }


afterinitgrid(count){
  this.totalpagesize = count;
  this.pagesize = Math.ceil(this.totalpagesize/this.searchCondition.pageSize);
}

 private gg(newpage){
       var selectedRowData = this.gridOptions.api.getSelectedRows();
      console.log(selectedRowData);
      this.page = this.paginationChanged(newpage,this.page,this.searchCondition.pageSize,this.pagesize);
       this.gridOptions.api.refreshView();
    }

  
    // Sometimes the gridReady event can fire before the angular component is ready to receive it, so in an angular
    // environment its safer to on you cannot safely rely on AfterViewInit instead before using the API
  ngAfterViewInit() {
    // this.gridOptions.api.sizeColumnsToFit();
    this.page = this.searchCondition.pageIndex;
  }

  private getFullWidthCellRenderer() {
    return TestCompontDetail;
  }

  public getRowHeight(params) {
    // console.log(params)
    const rowIsDetailRow = params.node.level === 1;
        // return 100 when detail row, otherwise return 25
    return rowIsDetailRow ? 200 : 25;
  }

  public getNodeChildDetails(record) {
    if (record.result) {
      return {
        group: true,
                // the key is used by the default group cellRenderer
        key: record.EntryId,
                // provide ag-Grid with the children of this group
        children: [record.result]
                // for demo, expand the third row by default
        // expanded: record.account === 30
      };
    }
    return null;
  }


  private minuteCellFormatter(params) {
    return params.value.toLocaleString() + 'm';
  }
 Delete() {
  //  var selectedRowData = this.gridOptions.api.getSelectedRows();
      console.log("delete");
}
}
