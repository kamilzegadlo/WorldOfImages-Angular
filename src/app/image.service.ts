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

import { Coordinates, Place, BackendResponse, placeNullObject } from './barrel';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) { }

  private placesUrl = 'api/place';
  private imageUrl = 'api/image';

  getPlace(coordinates: Coordinates): Observable<BackendResponse<Place>> {
    return this.http
      .get<BackendResponse<Place>>(this.placesUrl, {
        params: { x: coordinates.x.toString(), y: coordinates.y.toString() }
      })
      .pipe(catchError<BackendResponse<Place>, BackendResponse<Place>>(this.getPlaceErrorHandling));
  }

  savePlace(place: Place): Observable<BackendResponse<Place>> {
    return this.http
      .put(this.placesUrl, place)
      .pipe(catchError<BackendResponse<Place>, BackendResponse<Place>>(this.savePlaceErrorHandling));
  }

  private getPlaceErrorHandling(
    err: any,
    caught: Observable<BackendResponse<Place>>
  ): Observable<BackendResponse<Place>> {
    return of(<BackendResponse<Place>>{ isSuccess: false, errorMessage: 'There was an error! Try again!' });
  }

  private savePlaceErrorHandling(
    err: any,
    caught: Observable<BackendResponse<Place>>
  ): Observable<BackendResponse<Place>> {
    return of(<BackendResponse<Place>>{ isSuccess: false, errorMessage: 'There was an error during saving! Try again!' });
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
