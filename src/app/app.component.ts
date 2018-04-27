import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Place } from './place';

@Component({
  selector: 'kz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'World of Images';

  selectedPlace: Place;// = new Subject();

  selected(selected: Place) {
    this.selectedPlace=selected;//this.selectedPlace.next(selected);
  }
}
