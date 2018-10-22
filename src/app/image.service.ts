import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpHeaders,
  HttpResponse,
  HttpEvent
} from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';
import { catchError, map, tap } from 'rxjs/operators';

import { Coordinates, Place, GetPlaceResponse, placeNullObject } from './barrel';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  private placesUrl = 'api/place';
  private imageUrl = 'api/image';

  getPlace(coordinates: Coordinates): Observable<GetPlaceResponse> {
    return this.http
      .get<GetPlaceResponse>(this.placesUrl, {
        params: { x: coordinates.x.toString(), y: coordinates.y.toString() }
      })
      .pipe(catchError<GetPlaceResponse, GetPlaceResponse>(this.getPlaceErrorHandling));
  }

  savePlace(place: Place): Observable<Place> {
    return this.http
      .put(this.placesUrl, place)
      .pipe(catchError<Place, Place>(this.savePlaceErrorHandling));
  }

  private getPlaceErrorHandling(
    err: any,
    caught: Observable<GetPlaceResponse>
  ): Observable<GetPlaceResponse> {
    return of(<GetPlaceResponse>{isSuccess: false, errorMessage: 'There was an error! Try again!'});
  }

  private savePlaceErrorHandling(
    err: any,
    caught: Observable<Place>
  ): Observable<Place> {
    console.log('save place error handling');
    return of(placeNullObject);
  }

  saveImage(
    image: File,
    coordinates: Coordinates
  ): Observable<HttpEvent<Object>> {
    return this.http.put(
      this.imageUrl,
      {
        coordinates: {
          x: coordinates.x.toString(),
          y: coordinates.y.toString()
        },
        image: image
      },
      {
        reportProgress: true,
        observe: 'events'
      }
    );
  }
}
