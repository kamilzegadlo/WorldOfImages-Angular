import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ImageService, Place, BackendResponse } from './barrel';

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

  it('get place should return a mocked place',
    inject([ImageService], (service: ImageService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe(getPlaceResponse => {
        if (getPlaceResponse && getPlaceResponse.responseObject) {
          expect(getPlaceResponse.responseObject.x).toBe(13);
          expect(getPlaceResponse.responseObject.y).toEqual(14);
        } else {
          fail("getPlaceResponse or getPlaceResponse.place undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/place?x=13&y=14');
      placeRequest.flush({ x: 13, y: 14 });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    })
  );

  it('get place, if error, correct isSuccess and errorMessage should be set',
    inject([ImageService], (service: ImageService) => {
      service.getPlace({ x: 13, y: 14 }).subscribe(getPlaceResponse => {
        if (getPlaceResponse) {
          expect(getPlaceResponse.isSuccess).toBe(false);
          expect(getPlaceResponse.errorMessage).toEqual('There was an error! Try again!');
          expect(getPlaceResponse.responseObject).not.toBeDefined();
        } else {
          fail("getPlaceResponse undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/place?x=13&y=14');
      placeRequest.flush('invalid request', { status: 404, statusText: 'Bad Request' });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('GET');
    })
  );

  it('save place should return a mocked place',
    inject([ImageService], (service: ImageService) => {
      service.savePlace({ x: 14, y: 15, isDefined: false, name: 'newName' }).subscribe(savePlaceResponse => {
        if (savePlaceResponse && savePlaceResponse.responseObject) {
          expect(savePlaceResponse.responseObject.x).toBe(16);
          expect(savePlaceResponse.responseObject.y).toEqual(17);
        } else {
          fail("savePlaceResponse or savePlaceResponse.responseObject undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/place');
      placeRequest.flush({ x: 16, y: 17 });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    })
  );

  it('save place, if error, correct isSuccess and errorMessage should be set',
    inject([ImageService], (service: ImageService) => {
      service.savePlace({ x: 14, y: 15, isDefined: false, name: 'newName' }).subscribe(savePlaceResponse => {
        if (savePlaceResponse) {
          expect(savePlaceResponse.isSuccess).toBe(false);
          expect(savePlaceResponse.errorMessage).toEqual('There was an error during saving! Try again!');
          expect(savePlaceResponse.responseObject).not.toBeDefined();
        } else {
          fail("savePlaceResponse undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/place');
      placeRequest.flush('invalid request', { status: 404, statusText: 'Bad Request' });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    })
  );

  it('upload image should return a mocked place',
    inject([ImageService], (service: ImageService) => {
      service.saveImage(new File([], 'fileName'), { x: 14, y: 15 }).subscribe(saveImageResponse => {
        if (saveImageResponse && saveImageResponse.responseObject) {
          expect(saveImageResponse.responseObject.x).toBe(16);
          expect(saveImageResponse.responseObject.y).toEqual(17);
        } else {
          fail("saveImageResponse or saveImageResponse.responseObject undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/image');
      placeRequest.flush({ x: 16, y: 17 });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    })
  );

  it('upload image, if error, correct isSuccess and errorMessage should be set',
    inject([ImageService], (service: ImageService) => {
      service.saveImage(new File([], 'fileName'), { x: 14, y: 15 }).subscribe(saveImageResponse => {
        if (saveImageResponse) {
          expect(saveImageResponse.isSuccess).toBe(false);
          expect(saveImageResponse.errorMessage).toEqual('There was an error uploading an image! Try again!');
          expect(saveImageResponse.responseObject).not.toBeDefined();
        } else {
          fail("saveImageResponse undefined!");
        }
      });

      const placeRequest = httpMock.expectOne('api/image');
      placeRequest.flush('invalid request', { status: 404, statusText: 'Bad Request' });
      httpMock.verify();

      expect(placeRequest.request.method).toBe('PUT');
    })
  );

});
