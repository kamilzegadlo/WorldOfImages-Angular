import { Injectable } from '@angular/core';

import { Place } from './place';
import { PLACE } from './mock-place';

@Injectable()
export class ImageService {

  constructor() { }

  getPlace(x:number, y:number): Place {
    return {
      name: 'test name',
      x:x,
      y:y,
      images: null
    }
  }

}
