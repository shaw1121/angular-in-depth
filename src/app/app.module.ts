import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, FatherComponent, ChildComponent, AComponent, RetachDemoComponent } from './app.component';
import { ContentChildrenComponent, Pane, Tab } from './content-children/content-children.component';

@NgModule({
  declarations: [
    AppComponent,
    FatherComponent,
    ChildComponent,
    AComponent,
    RetachDemoComponent,
    ContentChildrenComponent,
    Pane,
    Tab,
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
