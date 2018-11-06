import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ImageService, Place, ActionResult } from './barrel';

describe('ImageService', () => {
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService],
      imports: [HttpClientTestingModule]
    });

    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));

  it('upload image should return false in success', inject(
    [ImageService],
    (service: ImageService) => {
      service
        .saveImage(new File([], 'fileName'), { x: 14, y: 15 })
        .subscribe(saveImageResponse => {
          expect(saveImageResponse).toBe(false);
        });

      const placeRequest = httpMock.expectOne('api/image');
      placeRequest.flush('');
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    }
  ));

  it('upload image, if error, correct isSuccess and errorMessage should be set', inject(
    [ImageService],
    (service: ImageService) => {
      service
        .saveImage(new File([], 'fileName'), { x: 14, y: 15 })
        .subscribe(saveImageResponse => {
          if (saveImageResponse) {
            expect(saveImageResponse).toBe(true);
          } else {
            fail('saveImageResponse undefined!');
          }
        });

      const placeRequest = httpMock.expectOne('api/image');
      placeRequest.flush('invalid request', {
        status: 404,
        statusText: 'Bad Request'
      });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    }
  ));
});
