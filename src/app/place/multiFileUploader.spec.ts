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

  it('when called with two images, the given successful function should be called twice', function (done) {
    inject([MultiFileUploader, ImageService], (service: MultiFileUploader, imageServiceStub: ImageServiceStub) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = new Place(100, 200, 'testMessage', true);

      let successCounter: number = 0;

      service.upload(files, place, imageServiceStub).subscribe((response) => {
        ++successCounter;
        if (successCounter === 2)
          done();
      });

    })()
  }
  );

  it('when called with two images, the given failure and successful functions should be called once each', function (done) {
    inject([MultiFileUploader, ImageService], (service: MultiFileUploader, imageServiceStub: ImageServiceStub) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = new Place(101, 201, 'testMessage', true);

      let successCounter: number = 0;
      let failureCounter: number = 0;

      service.upload(files, place, imageServiceStub).subscribe((response) => {
        ++successCounter;
        if (successCounter === 1 && failureCounter === 1) {
          done();
        }
      }, () => {
        ++failureCounter;
        if (successCounter === 1 && failureCounter === 1) {
          done();
        }
      });

    })()
  }
  );
})
