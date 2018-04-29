import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

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
  imports: [BrowserModule],
  providers: [ImageService, SelectionStateService],
  bootstrap: [AppComponent]
})
export class AppModule {}
