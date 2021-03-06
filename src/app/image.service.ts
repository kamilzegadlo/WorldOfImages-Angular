import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import { Coordinates } from './barrel';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) { }

  private imageUrl = 'api/image';

  saveImage(image: File, coordinates: Coordinates): Observable<Boolean> {
    return this.http
      .put(this.imageUrl, {
        coordinates: {
          x: coordinates.x.toString(),
          y: coordinates.y.toString()
        },
        image: image
      })
      .pipe(
      map(() => {
        return false;
      }),
      catchError(() => {
        return of(true);
      })
      );
  }
}
