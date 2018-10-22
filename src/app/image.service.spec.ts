import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ImageService, Place } from './barrel';

describe('ImageService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it(
    'should be created',
    inject([ImageService], (service: ImageService) => {
      expect(service).toBeTruthy();
    })
  );

  it('should return a mocked place',
    inject([ImageService], (service: ImageService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe(getPlaceResponse => {
        if(getPlaceResponse && getPlaceResponse.place)
        {
          expect(getPlaceResponse.place.x).toBe(13);
          expect(getPlaceResponse.place.y).toEqual(14);
        } else{
          fail("getPlaceResponse or getPlaceResponse.place undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/place?x=13&y=14');
      placeRequest.flush({isSuccess: true, place: { x: 13, y: 14 } as Place});
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    })
  );

  it('if error, correct isSuccess and errorMessage should be set',
    inject([ImageService], (service: ImageService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe(getPlaceResponse => {
        if(getPlaceResponse)
        {
          expect(getPlaceResponse.isSuccess).toBe(false);
          expect(getPlaceResponse.errorMessage).toEqual('There was an error! Try again!');
          expect(getPlaceResponse.place).not.toBeDefined();
        } else{
          fail("getPlaceResponse undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/place?x=13&y=14');
      placeRequest.flush('invalid request', {status: 404, statusText: 'Bad Request'});
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    })
  );
});
