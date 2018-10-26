import {
  HttpClient,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Coordinates, Place, BackendResponse, ImageService } from './barrel';

export class ImageServiceStub extends ImageService {

  getPlace(coordinates: Coordinates): Observable<BackendResponse<Place>> {
    if (coordinates.x === 11 && coordinates.y === 15) {
      return of({
        isSuccess: true, responseObject: new Place(100, 150, 'unit test name', true)
      } as BackendResponse<Place>);
    }
    if (coordinates.x === 12 && coordinates.y === 14) {
      return of({ isSuccess: true, responseObject: new Place(101, 151, 'test', true) } as BackendResponse<Place>);
    }
    if (coordinates.x === 14 && coordinates.y === 10) {
      return of({ isSuccess: true, responseObject: new Place(14, 10, 'test', false) } as BackendResponse<Place>);
    }
    if (coordinates.x === 901 && coordinates.y === 601) {
      return of({ isSuccess: false, errorMessage: "There was a unit test error!" } as BackendResponse<Place>);
    }
    if (coordinates.x === 902 && coordinates.y === 602) {
      return of({ isSuccess: true, responseObject: new Place(902, 602, 'test', true) } as BackendResponse<Place>);
    }
    if (coordinates.x === 15 && coordinates.y === 11) {
      return of({ isSuccess: true, responseObject: new Place(15, 11, 'test', false) } as BackendResponse<Place>);
    }
    return of({ isSuccess: true, responseObject: new Place(109, 159, 'test', true) } as BackendResponse<Place>);
  }

  savePlace(place: Place): Observable<BackendResponse<Place>> {
    if (place.x === 14 && place.y === 10) {
      return of({
        isSuccess: true,
        responseObject: new Place(999, 998, 'save test', true)
      } as BackendResponse<Place>);
    }
    if (place.x === 902 && place.y === 602) {
      return of({ isSuccess: false, errorMessage: "There was a unit test error during saving!" });
    }

    return of({
      isSuccess: true,
      responseObject: new Place(4, 5, 'error', true)
    });
  }

  saveImage(
    image: File,
    coordinates: Coordinates
  ): Observable<Boolean> {
    if (
      image.name === 'fileName2' &&
      coordinates.x === 101 &&
      coordinates.y === 201
    ) {
      return of(true);
    }

    return of(false);
  }

};
