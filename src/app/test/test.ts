import { Component, OnInit } from '@angular/core';
import {CommonUtilsServices} from '../Services/commonUtilsService';
import { Router, ActivatedRoute } from '@angular/router';

import baseGridComService from '../basejs/baseGrid';
import {GridOptionServices} from '../Services/gridOptionServices';
import {CommonUtilsLoopbackServices} from '../basejs/commonDBServices';
import {MoodEditorComponent} from './testselect'
import {MoodRendererComponent} from './testrender'
// import {ICellEditorComp} from 'ag-grid'

@Component({
  selector: 'fountain-test',
  template: require('./test.html'),
  providers:[GridOptionServices,CommonUtilsLoopbackServices]
})
export class TestComponent extends baseGridComService implements OnInit{
  public test: any;


constructor(public GridOptionService : GridOptionServices, public CommonUtilsLoopbackService :CommonUtilsLoopbackServices,private route: ActivatedRoute, private router: Router) {
    super('decmodheads', GridOptionService, CommonUtilsLoopbackService);
     this.searchCondition = {where: {}, pageIndex: 1, pageSize: 20, limit: 20};
     var gridOptions = {
        onGridReady: function (params) {
            params.api.sizeColumnsToFit();
        },
        onRowEditingStarted: function (event) {
            console.log('never called - not doing row editing');
        },
        onRowEditingStopped: function (event) {
            console.log('never called - not doing row editing');
        },
        onCellEditingStarted: function (event) {
            console.log('cellEditingStarted');
        },
        onCellEditingStopped: function (event) {
            console.log('cellEditingStopped');
        }
    };
     this.gridOptions.columnDefs = [
                {headerName: 'EntryId', field: 'EntryId', width: 150},
                {headerName: 'DecModSeqNo', field: 'DecModSeqNo', width: 150, editable: true},
                {headerName: 'DecSeqNo', field: 'DecSeqNo', width: 150,editable: true, cellEditorFramework: MoodEditorComponent},
                {headerName: 'DecModNote', field: 'DecModNote', width: 250},
                {headerName: 'EntOpName', field: 'EntOpName', width: 80},
                {headerName: 'EntOpTele', field: 'EntOpTele', width: 100},
                {headerName: 'FeedDept', field: 'FeedDept', width: 80},
                {headerName: 'ObjectID', field: 'ObjectID', width: 180},
                {headerName: 'Update_Time', field: 'Update_Time', width: 180},
                {headerName: 'User_Name', field: 'User_Name', width: 80}
    ];
  }
  ngOnInit() {
    // this.test = JSON.stringify(this.route.snapshot.params);
    // this.searchCondition.where = {EntryId: this.route.snapshot.params.id};
    // this.search();
  }




// function MoodCellRenderer() {}


// function MoodEditor() {
//     this.defaultImgStyle = 'padding-left:10px; padding-right:10px;  border: 1px solid transparent; padding: 4px;';
//     this.selectedImgStyle = 'padding-left:10px; padding-right:10px; border: 1px solid lightgreen; padding: 4px;';
// }

// MoodCellRenderer.prototype.init = function (params) {
//     if (params.value === "" || params.value === undefined || params.value === null) {
//         this.eGui = '';
//     } else {
//         var imgForMood = params.value === 'Happy' ? '../../images/smiley.png' : '../../images/smiley-sad.png';
//         this.eGui = '<img width="20px" src="' + imgForMood + '" />';
//     }
// };

// MoodCellRenderer.prototype.getGui = function () {
//     return this.eGui;
// };



// MoodEditor.prototype.onKeyDown = function (event) {
//     var key = event.which || event.keyCode;
//     if (key == 37 ||  // left
//         key == 39) {  // right
//         this.toggleMood();
//         event.stopPropagation();
//     }
// };

// MoodEditor.prototype.toggleMood = function () {
//     this.selectMood(this.mood === 'Happy' ? 'Sad' : 'Happy');
// };

// MoodEditor.prototype.init = function (params) {
//     this.container = document.createElement('div');
//     this.container.style = "border-radius: 15px; border: 1px solid grey;background: #e6e6e6;padding: 15px; text-align:center;display:inline-block;outline:none";
//     this.container.tabIndex = "0";                // to allow the div to capture keypresses

//     this.happyImg = document.createElement('img');
//     this.happyImg.src = '../../images/smiley.png';
//     this.happyImg.style = this.defaultImgStyle;

//     this.sadImg = document.createElement('img');
//     this.sadImg.src = '../../images/smiley-sad.png';
//     this.sadImg.style = this.defaultImgStyle;

//     this.container.appendChild(this.happyImg);
//     this.container.appendChild(this.sadImg);

//     var that = this;
//     this.happyImg.addEventListener('click', function (event) {
//         that.selectMood('Happy');
//         params.stopEditing();
//     });
//     this.sadImg.addEventListener('click', function (event) {
//         that.selectMood('Sad');
//         params.stopEditing();
//     });
//     this.container.addEventListener('keydown', function (event) {
//         that.onKeyDown(event)
//     });

//     this.selectMood(params.value);
// };

// MoodEditor.prototype.selectMood = function (mood) {
//     this.mood = mood;
//     this.happyImg.style = (mood === 'Happy') ? this.selectedImgStyle : this.defaultImgStyle;
//     this.sadImg.style = (mood === 'Sad') ? this.selectedImgStyle : this.defaultImgStyle;
// };

// // gets called once when grid ready to insert the element
// MoodEditor.prototype.getGui = function () {
//     return this.container;
// };

// MoodEditor.prototype.afterGuiAttached = function () {
//     this.container.focus();
// };

// MoodEditor.prototype.getValue = function () {
//     return this.mood;
// };

// // any cleanup we need to be done here
// MoodEditor.prototype.destroy = function () {
// };

// MoodEditor.prototype.isPopup = function () {
//     return true;
// };

}
