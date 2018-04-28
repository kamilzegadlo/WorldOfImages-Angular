import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent, MapComponent, PlaceComponent, ImageService, SelectionStateService } from './barrel';

@NgModule({
  declarations: [
    PlaceComponent,
    MapComponent,
    AppComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ImageService, SelectionStateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
