import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Coordinates, ImageService } from './barrel';

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
