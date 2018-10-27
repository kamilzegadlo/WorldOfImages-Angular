import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';

import { Place, ImageService, ActionResult } from '../barrel';

export class MultiFileUploader {
  private imageIndex: number;
  private images: File[];
  private place: Place;
  private imageService: ImageService;
  private reader: FileReader;
  private observer: Subscriber<{}>;

  constructor() {
    this.reader = new FileReader();
  }

  upload(
    images: File[],
    place: Place,
    imageService: ImageService
  ): Observable<ActionResult<string>> {
    this.imageIndex = 0;
    this.images = images;
    this.place = place;
    this.imageService = imageService;

    return new Observable(observer => {
      this.observer = observer;

      this.saveImage();
    });
  }

  private saveImage() {
    this.imageService
      .saveImage(this.images[this.imageIndex], this.place)
      .subscribe(this.HandleSaveImageResponse.bind(this));
  }

  private HandleSaveImageResponse(output: boolean) {
    if (!output) {
      this.reader.onload = this.readingImageFinished.bind(this);
      this.reader.readAsDataURL(this.images[this.imageIndex]);
    } else {
      this.observer.next({
        isSuccess: false,
        errorMessage: 'error in uploading image'
      });
      this.nextInteration();
    }
  }

  private nextInteration() {
    if (this.imageIndex < this.images.length - 1) {
      ++this.imageIndex;
      this.saveImage();
    } else {
      this.observer.complete();
    }
  }

  private readingImageFinished() {
    this.observer.next({ isSuccess: true, result: this.reader.result });
    this.nextInteration();
  }
}
