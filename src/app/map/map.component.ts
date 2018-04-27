import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Coordinates } from '../Coordinates';

@Component({
  selector: 'kz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() {}

  ngOnInit() {
  }

  @Output() selectedCoordinates = new EventEmitter();

  MapClicked = function(event){
    this.selectedCoordinates.emit(<Coordinates>{x:event.offsetX, y:event.offsetY});
  }

}
