import { TestBed, inject } from '@angular/core/testing';

import { ImageService } from './image.service';
import { PLACE } from './mock-place';

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
    expect(service.getPlace()).toBe(PLACE);
  }));
});
