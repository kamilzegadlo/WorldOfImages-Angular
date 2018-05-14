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

  it(
    'should return a mocked place',
    inject([ImageService], (service: ImageService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe(place => {
        expect(place.x).toBe(13);
        expect(place.y).toEqual(14);
      });

      let placeRequest = httpMock.expectOne('api/place');
      placeRequest.flush({ x: 13, y: 14 } as Place);
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    })
  );
});
