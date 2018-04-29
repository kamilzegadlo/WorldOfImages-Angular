import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Coordinates, SelectionStateService } from '../barrel';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  constructor(private selectionStateService: SelectionStateService) {}

  ngOnInit() {}

  MapClicked = function(this: MapComponent, event: any) {
    this.selectionStateService.selectedCoordinates.next(<Coordinates>{
      x: event.offsetX,
      y: event.offsetY
    });
  };
}
