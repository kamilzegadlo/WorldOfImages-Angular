import { TestBed, inject } from '@angular/core/testing';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';

import { ImageService } from './barrel';

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService, HttpClient],
      imports: [HttpClientModule]
    });
  });

  it(
    'should be created',
    inject([ImageService], (service: ImageService) => {
      expect(service).toBeTruthy();
    })
  );

  xit(
    'should return a mocked place',
    inject([ImageService], (service: ImageService) => {
      const place = service.getPlace({ x: 13, y: 14 });

      expect(place.x).toBe(13);
      expect(place.y).toBe(14);
    })
  );
});
