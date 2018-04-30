import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './in-memory-data.service';

import {
  AppComponent,
  MapComponent,
  ImageComponent,
  PlaceComponent,
  ImageService,
  SelectionStateService
} from './barrel';

@NgModule({
  declarations: [MapComponent, ImageComponent, PlaceComponent, AppComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
      dataEncapsulation: false
    })
  ],
  providers: [ImageService, SelectionStateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
