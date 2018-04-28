import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Coordinates, Place, ImageService, SelectionStateService } from '../barrel';

@Component({
  selector: 'kz-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  private selectedPlace: Coordinates;
  private selectedCoordinatesSubscrption: Subscription;

  constructor(private imageService: ImageService, private selectionStateService: SelectionStateService) { }

  ngOnInit() {
    this.selectedCoordinatesSubscrption = this.selectionStateService.selectedCoordinates.subscribe(
      newSelectedCoordinates => this.getPlace(newSelectedCoordinates));
  }

  ngOnDestroy() {
    this.selectedCoordinatesSubscrption.unsubscribe();
  }

  private getPlace(coordinates: Coordinates) {
    this.selectedPlace = this.imageService.getPlace(coordinates);
  }
}
