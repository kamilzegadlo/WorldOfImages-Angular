import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PlaceService, Place, ActionResult } from './barrel';

describe('PlaceService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlaceService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([PlaceService], (service: PlaceService) => {
    expect(service).toBeTruthy();
  }));

  it('get place should return a mocked place', inject(
    [PlaceService],
    (service: PlaceService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe((getPlaceResponse: ActionResult<Place>) => {
        if (getPlaceResponse && getPlaceResponse.result) {
          expect(getPlaceResponse.result.x).toBe(15);
          expect(getPlaceResponse.result.y).toEqual(16);
        } else {
          fail('getPlaceResponse or getPlaceResponse.place undefined!');
        }
      });

      const placeRequest = httpMock.expectOne('api/place?x=13&y=14');
      placeRequest.flush(new Place(15, 16, '', true));
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    }
  ));

  it('get place, if error, correct isSuccess and errorMessage should be set', inject(
    [PlaceService],
    (service: PlaceService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe((getPlaceResponse: ActionResult<Place>) => {
        if (getPlaceResponse) {
          expect(getPlaceResponse.isSuccess).toBe(false);
          expect(getPlaceResponse.errorMessage).toEqual(
            'There was an error! Try again!'
          );
          expect(getPlaceResponse.result).not.toBeDefined();
        } else {
          fail('getPlaceResponse undefined!');
        }
      });

      const placeRequest = httpMock.expectOne('api/place?x=13&y=14');
      placeRequest.flush('invalid request', {
        status: 404,
        statusText: 'Bad Request'
      });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    }
  ));

  it('save place should return a mocked place', inject(
    [PlaceService],
    (service: PlaceService) => {
      service
        .savePlace(new Place(14, 15, 'newName', false))
        .subscribe((savePlaceResponse: ActionResult<Place>) => {
          if (savePlaceResponse && savePlaceResponse.result) {
            expect(savePlaceResponse.result.x).toBe(16);
            expect(savePlaceResponse.result.y).toEqual(17);
          } else {
            fail('savePlaceResponse or savePlaceResponse.result undefined!');
          }
        });

      const placeRequest = httpMock.expectOne('api/place');
      placeRequest.flush(new Place(16, 17, 'newName', false));
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    }
  ));

  it('save place, if error, correct isSuccess and errorMessage should be set', inject(
    [PlaceService],
    (service: PlaceService) => {
      service
        .savePlace(new Place(14, 15, 'newName', false))
        .subscribe((savePlaceResponse: ActionResult<Place>) => {
          if (savePlaceResponse) {
            expect(savePlaceResponse.isSuccess).toBe(false);
            expect(savePlaceResponse.errorMessage).toEqual(
              'There was an error during saving! Try again!'
            );
            expect(savePlaceResponse.result).not.toBeDefined();
          } else {
            fail('savePlaceResponse undefined!');
          }
        });

      const placeRequest = httpMock.expectOne('api/place');
      placeRequest.flush('invalid request', {
        status: 404,
        statusText: 'Bad Request'
      });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    }
  ));
});
