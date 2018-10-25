import {
  Place,
  ImageService,
  BackendResponse
} from '../barrel';

export class MultiFileUploader {

  private imageIndex: number;
  private images: File[];
  private place: Place;
  private imageService: ImageService;
  private onSuccessImageLoad: (image: string) => void;
  private onFailureImageLoad: () => void;
  private reader: FileReader;

  constructor() {
    this.reader = new FileReader();
  }

  upload(images: File[], place: Place, imageService: ImageService, onSuccessImageLoad: (image: string) => void, onFailureImageLoad: () => void) {
    this.imageIndex = 0;
    this.images = images;
    this.place = place;
    this.imageService = imageService;
    this.onSuccessImageLoad = onSuccessImageLoad;
    this.onFailureImageLoad = onFailureImageLoad;

    this.imageService
      .saveImage(this.images[this.imageIndex], this.place)
      .subscribe(this.HandleSaveImageResponse.bind(this));
  }

  private HandleSaveImageResponse(output: boolean) {
    if (!output) {
      this.reader.onload = this.readingImageFinished.bind(this);
      this.reader.readAsDataURL(this.images[this.imageIndex]);
    }
    else {
      this.onFailureImageLoad();

      if (this.imageIndex < this.images.length - 1)
        this.imageService
          .saveImage(this.images[++this.imageIndex], this.place)
          .subscribe(this.HandleSaveImageResponse.bind(this));
    }
  }

  private readingImageFinished() {
    this.onSuccessImageLoad(this.reader.result);

    if (this.imageIndex < this.images.length - 1)
      this.imageService
        .saveImage(this.images[++this.imageIndex], this.place)
        .subscribe(this.HandleSaveImageResponse.bind(this));
  }

}
