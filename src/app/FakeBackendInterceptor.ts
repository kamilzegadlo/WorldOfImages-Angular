import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/observable/throw';
import 'rxjs/add/operator/delay';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/materialize';
import 'rxjs/add/operator/dematerialize';

import { Place } from './barrel';

@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {
  constructor() { }

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const PlacesFromSession = sessionStorage.getItem('places');
    let places: Place[] = [];
    if (PlacesFromSession) {
      const placesfromSession = JSON.parse(PlacesFromSession);
      placesfromSession.forEach((p: any) => places.push(new Place(p._x, p._y, p._name, p._isdefined)))
    }

    // wrap in delayed observable to simulate server api call
    return (
      Observable.of(null)
        .mergeMap(() => {
          // get place by coordinates
          if (request.url.endsWith('api/place') && request.method === 'GET') {
            const xFromQuery = request.params.get('x');
            const yFromQuery = request.params.get('y');

            let x = Number(xFromQuery ? xFromQuery : -1);
            let y = Number(yFromQuery ? yFromQuery : -1);

            const matchedPlaces = places.filter(place => {
              return place.x === x && place.y === y;
            });
            let place = matchedPlaces.length ? matchedPlaces[0] : null;

            if (place) {
              return Observable.of(
                new HttpResponse({ status: 200, body: place.clone() })
              );
            }
            return Observable.of(
              new HttpResponse({
                status: 204,
                body: new Place(x, y, 'New name', false)
              })
            );
          }

          // create place
          if (request.url.endsWith('api/place') && request.method === 'PUT') {
            const newPlace: Place = request.body;
            // validation
            const duplicatePlace = places.filter(place => {
              return place.x === newPlace.x && place.y === newPlace.y;
            }).length;
            if (duplicatePlace) {
              return Observable.throw('This place is already defined');
            }

            newPlace.define();

            places.push(newPlace.clone());
            try {
              sessionStorage.setItem('places', JSON.stringify(places));
            } catch (e) {
              if (e.code === 22 && e.name === 'QuotaExceededError') {
                throw 'You are using fake backend and you reached the session storage limit!';
              }
            }

            // respond 200 OK
            return Observable.of(
              new HttpResponse({
                status: 200, body: newPlace
              })
            );
          }

          //save image
          if (request.url.endsWith('api/image') && request.method === 'PUT') {
            const newImage = request.body;

            const placesFound = places.filter((place: Place) => {
              return (
                place.x == newImage.coordinates.x &&
                place.y == newImage.coordinates.y
              );
            });
            if (!placesFound || placesFound.length === 0) {
              return Observable.throw('Place not found!');
            }
            if (placesFound.length > 1) {
              return Observable.throw(
                'More than one place with coordinates found!'
              );
            }
            const place = placesFound[0];
            const reader = new FileReader();
            reader.addEventListener(
              'load',
              function () {
                place.addImage(reader.result);

                try {
                  sessionStorage.setItem('places', JSON.stringify(places));
                }
                catch (e) {
                  if (e.code === 22 && e.name === 'QuotaExceededError') {
                    throw 'You are using fake backend and you reached the session storage limit!';
                  }
                }
              },
              false
            );

            reader.readAsDataURL(newImage.image);

            return Observable.of(
              new HttpResponse({ status: 200, body: place })
            );
          }

          // pass through any requests not handled above
          return next.handle(request);
        })

        // call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
        .materialize()
        .delay(500)
        .dematerialize()
    );
  }
}

export let fakeBackendProvider = {
  // use fake backend in place of Http service for backend-less development
  provide: HTTP_INTERCEPTORS,
  useClass: FakeBackendInterceptor,
  multi: true
};
