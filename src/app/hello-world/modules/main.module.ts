import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HelloAppComponent } from '../components/hello-app/hello-app.component';
import { PageService } from '../services/page/page.service';

@NgModule({
  bootstrap: [HelloAppComponent],
  declarations: [
    HelloAppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
    PageService
  ]
})
export class MainModule {}
