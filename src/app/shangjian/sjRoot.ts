import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { SJcomponent }    from './sjcomponent';
import {SJDetailcomponent} from './sjdetailcomponent';

const sjRoutes: Routes = [
  { path: 'sj',  component: SJcomponent },
  { path: 'sj/:id', component: SJDetailcomponent }
];

@NgModule({
  imports: [
    RouterModule.forChild(sjRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class SJModuleRoot { }


/*
Copyright 2017 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/