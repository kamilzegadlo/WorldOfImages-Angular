import { Injectable } from '@angular/core';

import { Place } from './place';
import { PLACE } from './mock-place';

@Injectable()
export class ImageService {

  constructor() { }

  getPlace(): Place {
    return PLACE;
  }

}
