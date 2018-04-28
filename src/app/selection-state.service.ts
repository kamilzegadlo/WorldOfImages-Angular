import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Coordinates, placeNullObject } from './barrel';

@Injectable()
export class SelectionStateService {

  constructor() { }

  selectedCoordinates = new BehaviorSubject<Coordinates>(placeNullObject);

}
