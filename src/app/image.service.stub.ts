import { HttpClient, HttpResponse, HttpEvent } from '@angular/common/http';

import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Coordinates, Place, ActionResult, ImageService } from './barrel';

export class ImageServiceStub extends ImageService {
  saveImage(image: File, coordinates: Coordinates): Observable<Boolean> {
    if (
      image.name === 'fileName2' &&
      coordinates.x === 101 &&
      coordinates.y === 201
    ) {
      return of(true);
    }

    return of(false);
  }
}
