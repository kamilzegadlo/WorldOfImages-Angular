import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import { Coordinates, Place, ActionResult, PlaceService } from './barrel';

export class PlaceServiceStub extends PlaceService {
  getPlace(coordinates: Coordinates): Observable<ActionResult<Place>> {
    if (coordinates.x === 11 && coordinates.y === 15) { 
      return of({
        isSuccess: true,
        result: new Place(100, 150, 'unit test name', true)
      } as ActionResult<Place>);
    }
    if (coordinates.x === 14 && coordinates.y === 10) {
      return of({
        isSuccess: true,
        result: new Place(14, 10, 'test', false)
      } as ActionResult<Place>);
    }
    if (coordinates.x === 901 && coordinates.y === 601) {
      return of({
        isSuccess: false,
        errorMessage: 'There was a unit test error!'
      } as ActionResult<Place>);
    }
    if (coordinates.x === 15 && coordinates.y === 11) {
      return of({
        isSuccess: true,
        result: new Place(15, 11, 'test', false)
      } as ActionResult<Place>);
    }
    return of({
      isSuccess: true,
      result: new Place(109, 159, 'test', true)
    } as ActionResult<Place>);
  }

  savePlace(place: Place): Observable<ActionResult<Place>> {
    if (place.x === 14 && place.y === 10) {
      return of({
        isSuccess: true,
        result: new Place(999, 998, 'save test', true)
      } as ActionResult<Place>);
    }
    if (place.x === 100 && place.y === 150) {
      return of({
        isSuccess: false,
        errorMessage: 'There was a unit test error during saving!'
      });
    }

    return of({
      isSuccess: true,
      result: new Place(4, 5, 'error', true)
    });
  }
}
