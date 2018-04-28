import { Component, OnInit, Input } from '@angular/core';

import { Coordinates, Place, placeNullObject, ImageService, SelectionStateService } from '../barrel';

@Component({
  selector: 'kz-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  constructor(private imageService: ImageService, private selectionStateService: SelectionStateService) { }

  ngOnInit() {
    this.selectedPlace = placeNullObject;
    this.selectionStateService.selectedCoordinates.subscribe(newSelectedCoordinates => this.getPlace(newSelectedCoordinates));
  }

  private selectedPlace: Coordinates;

  private getPlace(coordinates: Coordinates) {
    this.selectedPlace = this.imageService.getPlace(coordinates);
  }
}
