import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {GridOptions} from 'ag-grid/main';
import {routing, RootComponent} from './routes';
import {HelloComponent} from './hello';
import { FormsModule }   from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import {CommonUtilsServices} from './Services/commonUtilsService';
import {GridOptionServices} from './Services/gridOptionServices';
import {CommonUtilsLoopbackServices} from './basejs/commonDBServices';
import {TestModule} from './compont/TestModule';
import {SJModule} from './shangjian/sjModule';
import {MoodEditorComponent} from './test/testselect'
import {MoodRendererComponent} from './test/testrender'
import {AgGridModule} from 'ag-grid-angular/main';

@NgModule({
  providers: [
        CommonUtilsServices, // 添加我们刚才的服务
        GridOptionServices,
        CommonUtilsLoopbackServices
  ],
  imports: [
    BrowserModule,
    routing,
    FormsModule,
    HttpModule,
    JsonpModule,
    SJModule,
    TestModule,
    AgGridModule.withComponents([
      MoodEditorComponent,
      MoodRendererComponent
    ])
  ],
  declarations: [
    RootComponent,
    HelloComponent,
    MoodEditorComponent,
    MoodRendererComponent
  ],
  bootstrap: [RootComponent]
})
export class AppModule {}
