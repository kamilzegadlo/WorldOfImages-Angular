import {
  HttpClient,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Coordinates, Place, ImageService } from './barrel';

export class ImageServiceStub extends ImageService {

  getPlace(coordinates: Coordinates): Observable<Place> {
    if (coordinates.x === 11 && coordinates.y === 15) {
      return of({
        x: 100,
        y: 150,
        name: 'unit test name',
        isDefined: true
      } as Place);
    }
    if (coordinates.x === 12 && coordinates.y === 14) {
      return of({ x: 101, y: 151, isDefined: true } as Place);
    }
    if (coordinates.x === 14 && coordinates.y === 10) {
      return of({ x: 14, y: 10, isDefined: false, name: 'test' } as Place);
    }
    return of({ x: 109, y: 159, isDefined: true } as Place);
  }

  savePlace(place: Place): Observable<Place> {
    if (place.x === 14 && place.y === 10) {
      const p: Place = {
        isDefined: true,
        x: 999,
        y: 998,
        name: 'save test'
      };

      return of(p);
    }
    const p: Place = {
      isDefined: true,
      x: 4,
      y: 5,
      name: 'error'
    };

    return of(p);
  }

  saveImage(
    image: File,
    coordinates: Coordinates
  ): Observable<HttpEvent<Object>> {
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
      const httpResponse = new HttpResponse({ body: place });

      return of(httpResponse);
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
      const httpResponse = new HttpResponse({ body: place });

      return of(httpResponse);
    }
    const place: Place = {
      isDefined: true,
      x: 1,
      y: 2,
      name: 'error'
    };
    const httpResponse = new HttpResponse({ body: place });

    return of(httpResponse);
  }

};
