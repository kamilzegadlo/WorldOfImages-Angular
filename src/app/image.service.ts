import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Coordinates, Place, placeNullObject } from './barrel';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  private placesUrl = 'api/place';

  getPlace(coordinates: Coordinates): Observable<Place> {
    return this.http
      .get<Place>(this.placesUrl, {
        params: { x: coordinates.x.toString(), y: coordinates.y.toString() }
      })
      .pipe(catchError<Place, Place>(this.getPlaceErrorHandling));
  }

  getPlaceErrorHandling(
    err: any,
    caught: Observable<Place>
  ): Observable<Place> {
    debugger;
    console.log('get place error handling');
    return of(placeNullObject);
  }
}
