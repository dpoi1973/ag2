import {Component, AfterViewInit} from '@angular/core';
import {GridOptions} from 'ag-grid/main';
import {ICellRendererAngularComp} from 'ag-grid-angular/main';

@Component({
  selector: 'fountain-testcompontdetail',
  template: require('./TestCompontDetail.html')
})
export class TestCompontDetail implements ICellRendererAngularComp,AfterViewInit {
    public gridOptions: GridOptions;
    public parentRecord: any;

  constructor() {
    this.gridOptions = <GridOptions>{};
    this.gridOptions.enableSorting = true;
    this.gridOptions.enableFilter = true;
    this.gridOptions.enableColResize = true;
    this.gridOptions.columnDefs = this.createColumnDefs();
  }

  agInit(params) {
    console.log(params)
    this.parentRecord = params.node.parent.data;
  }

    // Sometimes the gridReady event can fire before the angular component is ready to receive it, so in an angular
    // environment its safer to on you cannot safely rely on AfterViewInit instead before using the API
  ngAfterViewInit() {
    this.gridOptions.api.setRowData(this.parentRecord.result);
    this.gridOptions.api.sizeColumnsToFit();
  }

  onSearchTextChange(newData) {
    this.gridOptions.api.setQuickFilter(newData);
  }

  private createColumnDefs() {
    return [{headerName: 'DecModSeqNo', field: 'DecModSeqNo', cellClass: 'call-record-cell'},
            {headerName: 'EntryId', field: 'EntryId', cellClass: 'call-record-cell'},
            {headerName: 'Note', field: 'Note', cellClass: 'call-record-cell'},
      {
        headerName: 'ObjectID',
        field: 'ObjectID',
        cellClass: 'call-record-cell'
      },
            {headerName: 'Reply_Time', field: 'Reply_Time', cellClass: 'call-record-cell'}];
  }

  private  secondCellFormatter(params) {
    return params.value.toLocaleString() + 's';
  }

    // if we don't do this, then the mouse wheel will be picked up by the main
    // grid and scroll the main grid and not this component. this ensures that
    // the wheel move is only picked up by the text field
  consumeMouseWheelOnDetailGrid($event) {
    $event.stopPropagation();
  }

  onButtonClick() {
    window.alert('Sample button pressed!!');
  }
}
