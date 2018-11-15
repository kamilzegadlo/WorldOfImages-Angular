import { Injectable } from '@angular/core';
import {
  HttpClient
} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, map } from 'rxjs/operators';

import { Coordinates, Place, ActionResult } from './barrel';

@Injectable()
export class PlaceService {
  constructor(private http: HttpClient) { }

  private placesUrl = 'api/place';

  getPlace(coordinates: Coordinates): Observable<ActionResult<Place>> {
    return this.http
      .get<Place>(this.placesUrl, {
        params: { x: coordinates.x.toString(), y: coordinates.y.toString() }
      })
      .pipe(
      map((place: Place) => {
        return <ActionResult<Place>>{
          isSuccess: true,
          result: place
        };
      }),
      catchError(() => {
        return of(<ActionResult<Place>>{
          isSuccess: false,
          errorMessage: 'There was an error! Try again!'
        });
      })
      );
  }

  savePlace(place: Place): Observable<ActionResult<Place>> {
    return this.http.put<Place>(this.placesUrl, place).pipe(
      map((place: Place) => {
        return <ActionResult<Place>>{
          isSuccess: true,
          result: place
        };
      }),
      catchError(() => {
        return of(<ActionResult<Place>>{
          isSuccess: false,
          errorMessage: 'There was an error during saving! Try again!'
        });
      })
    );
  }
}
