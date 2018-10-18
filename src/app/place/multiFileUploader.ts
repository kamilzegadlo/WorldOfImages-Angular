import { HttpEventType, HttpEvent } from '@angular/common/http';

import {
  Place,
  ImageService,
} from '../barrel';

export class MultiFileUploader {

  private imageIndex: number;
  private images: File[];
  private place: Place;
  private imageService: ImageService;
  private onSuccessImageLoad: (place: Place)=> void;

  constructor(){}

  upload(images: File[], place: Place, imageService: ImageService, onSuccessImageLoad: (place: Place)=> void){
    this.imageIndex=0;
    this.images=images;
    this.place=place;
    this.imageService=imageService;
    this.onSuccessImageLoad=onSuccessImageLoad;

    this.imageService
        .saveImage(this.images[this.imageIndex], this.place)
        .subscribe(this.HandleSaveImageResponse.bind(this));
  }

  private HandleSaveImageResponse(httpResponse: HttpEvent<Object>) {
    if ( httpResponse.type === HttpEventType.Response && httpResponse.status===200 && httpResponse.body) {
      this.onSuccessImageLoad(<Place>httpResponse.body);
      if(this.imageIndex < this.images.length-1)
        this.imageService
          .saveImage(this.images[++this.imageIndex], this.place)
          .subscribe(this.HandleSaveImageResponse.bind(this));
      }
  }
}
