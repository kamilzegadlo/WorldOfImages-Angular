import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { HttpEvent, HttpResponse } from '@angular/common/http';

import { of } from 'rxjs/observable/of';

import {
  ImageService,
  MultiFileUploader,
  Place
} from '../barrel';

describe('MultiFileUploader', () => {
  let component: MultiFileUploader;

  interface ImageServiceMock {
    saveImage(
      image: any,
      coordinates: Coordinates
    ): Observable<HttpEvent<Object>>;
  }


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        MultiFileUploader
      ]
    }).compileComponents();
  }));

  it('should be created',
    inject([MultiFileUploader], (service: MultiFileUploader) => {
      expect(service).toBeTruthy();
    })
  );

  it('when called with two images, the given function should be called twice',
    inject([MultiFileUploader], (service: MultiFileUploader) => {

      const files: File[] = [new File([], 'fileName1'), new File([], 'fileName2')]
      const place: Place = {
          isDefined: true,
          x: 100,
          y: 200,
          name: 'testMessage'
        };
      const imageServiceMock: ImageServiceMock = {
        saveImage: (
          image: File,
          coordinates: Coordinates
        ): Observable<HttpEvent<Object>> => {
          if (
            image.name === 'fileName1' &&
            coordinates.x === 100 &&
            coordinates.y === 200
          ) {
            const place: Place = {
              isDefined: true,
              x: 112,
              y: 113,
              name: 'save test1',
              images: [image]
            };
            const httpResponse = new HttpResponse({ body: place });

            return of(httpResponse);
          }
          if (
            image.name === 'fileName2' &&
            coordinates.x === 100 &&
            coordinates.y === 200
          ) {
            const place: Place = {
              isDefined: true,
              x: 212,
              y: 213,
              name: 'save test2',
              images: [image]
            };
            const httpResponse = new HttpResponse({ body: place });

            return of(httpResponse);
          }
          const place: Place = {
            isDefined: true,
            x: 1,
            y: 2,
            name: 'error'
          };
          const httpResponse = new HttpResponse({ body: place });

          return of(httpResponse);
        }
      };

      const places: Place[]=[];

      const onSuccessImageLoad= function(place: Place){
        places.push(place);
      }

      service.upload(files, place, imageServiceMock, onSuccessImageLoad);

      expect(places.length).toEqual(2);
      expect(places[0].name]).toEqual('save test1');
      expect(places[1].name]).toEqual('save test2');

    })
  );


})
