import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Coordinates, Place } from './barrel';

@Injectable()
export class ImageService {
  constructor(private http: HttpClient) {}

  private placesUrl = 'api/place';

  getPlace(coordinates: Coordinates): Observable<Place> {
    return this.http.get<Place>(this.placesUrl, {
      params: { x: coordinates.x.toString(), y: coordinates.y.toString() }
    });
  }
}
