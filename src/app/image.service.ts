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
      .get<Place>(this.placesUrl, {
        params: { x: coordinates.x.toString(), y: coordinates.y.toString() }
      }).pipe(map((place: Place) => {
        return <BackendResponse<Place>>{ isSuccess: true, responseObject: place };
      }), catchError(() => {
        return of(<BackendResponse<Place>>{ isSuccess: false, errorMessage: 'There was an error! Try again!' });
      }))
  }

  savePlace(place: Place): Observable<BackendResponse<Place>> {
    return this.http.put<Place>(this.placesUrl, place)
      .pipe(map((place: Place) => {
        return <BackendResponse<Place>>{ isSuccess: true, responseObject: place };
      }), catchError(() => {
        return of(<BackendResponse<Place>>{ isSuccess: false, errorMessage: 'There was an error during saving! Try again!' });
      }))
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
