import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular/main';

import {SJcomponent} from './sjcomponent';
import {SJDetailcomponent} from './sjdetailcomponent';

import {CommonUtilsServices} from '../Services/commonUtilsService';
import {GridOptionServices} from '../Services/GridOptionServices';

import { SJModuleRoot } from './sjRoot';

import {SelectModule} from 'ng2-select';
import { DatepickerModule } from 'ng2-bootstrap';
import 'ng2-select/bundles/ng2-select.umd.min.js';
import { MyDatePickerModule } from 'mydatepicker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SJModuleRoot,
    SelectModule,
    AgGridModule.withComponents(
      [
        SJcomponent
      ]),
    DatepickerModule.forRoot(),
    MyDatePickerModule
  ],
  declarations: [
    SJcomponent,
    SJDetailcomponent
  ],
  providers: [ CommonUtilsServices,GridOptionServices ]
})
export class SJModule {}