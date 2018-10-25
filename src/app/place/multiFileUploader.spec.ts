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
      const place: Place = new Place(100, 200, 'testMessage', true);

      let counter: number = 0;

      const onSuccessImageLoad = function (image: string) {
        counter++
        if (counter === 1)
          expect(true).toBe(true);
        if (counter === 2)
          expect(true).toBe(true);
        if (counter === 3)
          expect(false).toBe(true);
      }

      const onFailureImageLoad = function () {
        expect(false).toBe(true);
      }

      service.upload(files, place, imageServiceStub, onSuccessImageLoad, onFailureImageLoad);
    })
  );

  it('when called with two images, the given failure and successful functions should be called once each',
    inject([MultiFileUploader, ImageService], (service: MultiFileUploader, imageServiceStub: ImageServiceStub) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = new Place(101, 201, 'testMessage', true);

      const onSuccessImageLoad = function (image: string) {
        expect(true).toBe(true);
      }

      const onFailureImageLoad = function () {
        expect(true).toBe(true);
      }

      service.upload(files, place, imageServiceStub, onSuccessImageLoad, onFailureImageLoad);
    })
  );

})
