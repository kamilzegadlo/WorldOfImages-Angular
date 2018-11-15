import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Coordinates } from './barrel';

@Injectable()
export class SelectionStateService {
  constructor() { }

  selectedCoordinates = new Subject<Coordinates>();
}
