import { Injectable } from '@angular/core';

import { Coordinates, Place, PLACE } from './barrel';

@Injectable()
export class ImageService {

  constructor() { }

  getPlace(coordinates: Coordinates): Place {
    return {
      name: 'test name',
      x:coordinates.x,
      y:coordinates.y,
      images: null
    }
  }

}
