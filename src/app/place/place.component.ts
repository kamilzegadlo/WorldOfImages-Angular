import { Component, OnInit, Input } from '@angular/core';

import { Place } from '../place';
import { PLACE } from '../mock-place';

@Component({
  selector: 'kz-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.selectedPlace=PLACE;
  }

  @Input() selectedPlace: Place;
  //@Input('selectedPlace') set selectedPlace(selectedPlace: Place) {
  //  debugger;
 // }


}
