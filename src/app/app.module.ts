import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { PlaceComponent } from './place/place.component';
import { ImageService } from './image.service';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    PlaceComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [ImageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
