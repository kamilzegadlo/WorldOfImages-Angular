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

  it('when called with two images, the given function should be called twice',
    inject([MultiFileUploader, ImageService], (service: MultiFileUploader, imageServiceStub: ImageServiceStub) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = {
          isDefined: true,
          x: 100,
          y: 200,
          name: 'testMessage'
        };


      const places: Place[]=[];

      const onSuccessImageLoad= function(place: Place){
        places.push(place);
      }

      service.upload(files, place, imageServiceStub, onSuccessImageLoad);

      expect(places.length).toEqual(2);
      expect(places[0].name).toEqual('save test1');
      expect(places[1].name).toEqual('save test2');

    })
  );


})
