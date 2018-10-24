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
  private onSuccessImageLoad: (place: Place) => void;
  private onFailureImageLoad: () => void;

  constructor() { }

  upload(images: File[], place: Place, imageService: ImageService, onSuccessImageLoad: (place: Place) => void, onFailureImageLoad: () => void) {
    this.imageIndex = 0;
    this.images = images;
    this.place = place;
    this.imageService = imageService;
    this.onSuccessImageLoad = onSuccessImageLoad;
    this.onFailureImageLoad = onFailureImageLoad;

    this.imageService
      .saveImage(this.images[this.imageIndex], this.place)
      .subscribe(this.HandleSaveImageResponse.bind(this));;
  }

  private HandleSaveImageResponse(backendResponse: BackendResponse<Place>) {
    if (backendResponse.isSuccess) {
      this.onSuccessImageLoad(<Place>backendResponse.responseObject);
    }
    else {
      this.onFailureImageLoad();
    }
    if (this.imageIndex < this.images.length - 1)
      this.imageService
        .saveImage(this.images[++this.imageIndex], this.place)
        .subscribe(this.HandleSaveImageResponse.bind(this));
  }
}
