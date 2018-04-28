import { TestBed, inject } from '@angular/core/testing';

import { ImageService, PLACE } from './barrel';

describe('ImageService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ImageService]
    });
  });

  it('should be created', inject([ImageService], (service: ImageService) => {
    expect(service).toBeTruthy();
  }));

  it('should return a mocked place', inject([ImageService], (service: ImageService) => {
    let place=service.getPlace({x:13, y:14});

    expect(place.x).toBe(13);
    expect(place.y).toBe(14);
  }));
});
