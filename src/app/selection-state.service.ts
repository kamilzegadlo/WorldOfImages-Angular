import { EventEmitter, Injectable } from '@angular/core';

import { Coordinates } from './barrel';

@Injectable()
export class SelectionStateService {

  constructor() { }

  selectedCoordinates = new EventEmitter<Coordinates>();

}
