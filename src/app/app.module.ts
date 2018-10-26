import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here

import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
  AppComponent,
  MapComponent,
  ImageComponent,
  PlaceComponent,
  ImageService,
  MultiFileUploader,
  SelectionStateService
} from './barrel';

import { fakeBackendProvider } from './fakeBackendInterceptor';

@NgModule({
  declarations: [MapComponent, ImageComponent, PlaceComponent, AppComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, BrowserAnimationsModule],
  providers: [
    ImageService,
    SelectionStateService,
    MultiFileUploader,
    fakeBackendProvider
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
