import {Component} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HelloComponent} from './hello';
import {TestComponent} from './test/test';
import {TestCompont} from './compont/TestCompont';
// import {TestCompontDetail} from './compont/TestCompontDetail';


@Component({
  selector: 'fountain-root',
  template: `<router-outlet></router-outlet>`
})
export class RootComponent {}

export const routes: Routes = [
  {
    path: '',
    component: HelloComponent,
    // redirectTo: '/testco',
    // pathMatch: 'full'    
  },
  // { 
  //   path: 'testco/:id',  
  //   component:  TestComponent
  // },
  // {
  //   path: 'testco',
  //   component: TestCompont
  //   // children: [{
  //   //   path: ':id',
  //   //   component:  TestComponent
  //   //   }]
  // }
];

export const routing = RouterModule.forRoot(routes);
