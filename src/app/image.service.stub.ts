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
        isSuccess: true, responseObject: {
          x: 100,
          y: 150,
          name: 'unit test name',
          isDefined: true
        } as Place
      } as BackendResponse<Place>);
    }
    if (coordinates.x === 12 && coordinates.y === 14) {
      return of({ isSuccess: true, responseObject: { x: 101, y: 151, isDefined: true } as Place } as BackendResponse<Place>);
    }
    if (coordinates.x === 14 && coordinates.y === 10) {
      return of({ isSuccess: true, responseObject: { x: 14, y: 10, isDefined: false, name: 'test' } as Place } as BackendResponse<Place>);
    }
    if (coordinates.x === 901 && coordinates.y === 601) {
      return of({ isSuccess: false, errorMessage: "There was a unit test error!" } as BackendResponse<Place>);
    }
    if (coordinates.x === 902 && coordinates.y === 602) {
      return of({ isSuccess: true, responseObject: { x: 902, y: 602, isDefined: true } as Place } as BackendResponse<Place>);
    }
    if (coordinates.x === 15 && coordinates.y === 11) {
      return of({ isSuccess: true, responseObject: { x: 15, y: 11, isDefined: false, name: 'test' } as Place } as BackendResponse<Place>);
    }
    return of({ isSuccess: true, responseObject: { x: 109, y: 159, isDefined: true } as Place } as BackendResponse<Place>);
  }

  savePlace(place: Place): Observable<BackendResponse<Place>> {
    if (place.x === 14 && place.y === 10) {
      return of({
        isSuccess: true,
        responseObject: {
          isDefined: true,
          x: 999,
          y: 998,
          name: 'save test'
        }
      } as BackendResponse<Place>);
    }
    if (place.x === 902 && place.y === 602) {
      return of({ isSuccess: false, errorMessage: "There was a unit test error during saving!" });
    }

    return of({
      isSuccess: true,
      responseObject: {
        isDefined: true,
        x: 4,
        y: 5,
        name: 'error'
      }
    });
  }

  saveImage(
    image: File,
    coordinates: Coordinates
  ): Observable<BackendResponse<Place>> {
    if (
      image.name === 'fileName1' &&
      coordinates.x === 100 &&
      coordinates.y === 200
    ) {
      const place: Place = {
        isDefined: true,
        x: 112,
        y: 113,
        name: 'save test1',
        images: ['image']
      };

      return of({ isSuccess: true, responseObject: place });
    }
    if (
      image.name === 'fileName2' &&
      coordinates.x === 100 &&
      coordinates.y === 200
    ) {
      const place: Place = {
        isDefined: true,
        x: 212,
        y: 213,
        name: 'save test2',
        images: ['image']
      };

      return of({ isSuccess: true, responseObject: place });
    }

    if (
      image.name === 'fileName1' &&
      coordinates.x === 101 &&
      coordinates.y === 201
    ) {
      return of({ isSuccess: false, errorMessage: 'error message' });
    }

    if (
      image.name === 'fileName2' &&
      coordinates.x === 101 &&
      coordinates.y === 201
    ) {
      const place: Place = {
        isDefined: true,
        x: 112,
        y: 113,
        name: 'save test1',
        images: ['image']
      };

      return of({ isSuccess: true, responseObject: place });
    }

    const place: Place = {
      isDefined: true,
      x: 1,
      y: 2,
      name: 'error'
    };

    return of({ isSuccess: true, responseObject: place });
  }

};
