import { EventEmitter, Injectable } from '@angular/core';

import { Coordinates } from './Coordinates';

@Injectable()
export class SelectionStateService {

  constructor() { }

  selectedCoordinates = new EventEmitter<Coordinates>();

}
