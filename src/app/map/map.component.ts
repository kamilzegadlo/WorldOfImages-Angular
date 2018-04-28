import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { Coordinates } from '../Coordinates';
import { SelectionStateService } from '../selection-state.service';

@Component({
  selector: 'kz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private selectionStateService: SelectionStateService) {}

  ngOnInit() {
  }

  MapClicked = function(event){
    this.selectionStateService.selectedCoordinates.emit(<Coordinates>{x:event.offsetX, y:event.offsetY});
  }

}
