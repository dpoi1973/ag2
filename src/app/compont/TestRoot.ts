import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TestCompont }    from './TestCompont';
import { TestCompontDetail }  from './TestCompontDetail';
import {TestComponent} from '../test/test'

const testRoutes: Routes = [
  { path: 'gaidan',  component: TestCompont },
  { path: 'gaidan/:id', component: TestComponent }
];
  
@NgModule({
  imports: [
    RouterModule.forChild(testRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class TestRoutingModule { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/