import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { HttpClient, HttpEvent, HttpResponse, HttpHandler } from '@angular/common/http';

import { of } from 'rxjs/observable/of';
import { Observable } from 'rxjs/Observable';

import {
  ImageService,
  ImageServiceStub,
  MultiFileUploader,
  Place,
  Coordinates
} from '../barrel';

describe('MultiFileUploader', () => {
  let component: MultiFileUploader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MultiFileUploader,
        HttpClient,
        HttpHandler,
        { provide: ImageService, useClass: ImageServiceStub },
      ]
    }).compileComponents();
  }));

  it('should be created',
    inject([MultiFileUploader], (service: MultiFileUploader) => {
      expect(service).toBeTruthy();
    })
  );

  it('when called with two images, the given successful function should be called twice',
    inject([MultiFileUploader, ImageService], (service: MultiFileUploader, imageServiceStub: ImageServiceStub) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = {
        isDefined: true,
        x: 100,
        y: 200,
        name: 'testMessage'
      };


      const successPlaces: Place[] = [];
      const failedPlaces: string[] = [];

      const onSuccessImageLoad = function (place: Place) {
        successPlaces.push(place);
      }

      const onFailureImageLoad = function () {
        failedPlaces.push('a');
      }

      service.upload(files, place, imageServiceStub, onSuccessImageLoad, onFailureImageLoad);

      expect(successPlaces.length).toEqual(2);
      expect(failedPlaces.length).toEqual(0);
      expect(successPlaces[0].name).toEqual('save test1');
      expect(successPlaces[1].name).toEqual('save test2');

    })
  );

  it('when called with two images, the given failure and successful functions should be called once each',
    inject([MultiFileUploader, ImageService], (service: MultiFileUploader, imageServiceStub: ImageServiceStub) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = {
        isDefined: true,
        x: 101,
        y: 201,
        name: 'testMessage'
      };


      const successPlaces: Place[] = [];
      const failedPlaces: string[] = [];

      const onSuccessImageLoad = function (place: Place) {
        successPlaces.push(place);
      }

      const onFailureImageLoad = function () {
        failedPlaces.push('b');
      }

      service.upload(files, place, imageServiceStub, onSuccessImageLoad, onFailureImageLoad);

      expect(successPlaces.length).toEqual(1);
      expect(failedPlaces.length).toEqual(1);
      expect(successPlaces[0].name).toEqual('save test1');

    })
  );

})
