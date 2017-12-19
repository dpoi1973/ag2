import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { FormsModule }    from '@angular/forms';
import {AgGridModule} from 'ag-grid-angular/main';

import {TestCompont} from './TestCompont';
import {TestCompontDetail} from './TestCompontDetail';

import {CommonUtilsServices} from '../Services/commonUtilsService';
import {GridOptionServices} from '../Services/GridOptionServices';
import {CommonUtilsLoopbackServices} from '../basejs/commonDBServices';

import {TestComponent} from '../test/test'
import { TestRoutingModule } from './TestRoot';

import {SelectModule} from 'ng2-select';
import { TypeaheadModule } from 'ng2-bootstrap';
import 'ng2-select/bundles/ng2-select.umd.min.js';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    TestRoutingModule,
    AgGridModule.withComponents(
      [ TestCompont,
        TestCompontDetail
      ]),
      TypeaheadModule.forRoot(),
      SelectModule
  ],
  declarations: [
    TestCompont,
    TestCompontDetail,
    TestComponent
  ],
  providers: [ CommonUtilsServices,GridOptionServices,CommonUtilsLoopbackServices ]
})
export class TestModule {}