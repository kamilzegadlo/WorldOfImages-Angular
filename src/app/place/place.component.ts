import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import {
  Coordinates,
  Place,
  ImageService,
  SelectionStateService
} from '../barrel';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit, OnDestroy {
  private selectedPlace: Place;
  private selectedCoordinatesSubscrption: Subscription;

  constructor(
    private imageService: ImageService,
    private selectionStateService: SelectionStateService
  ) {}

  ngOnInit() {
    this.selectedCoordinatesSubscrption = this.selectionStateService.selectedCoordinates.subscribe(
      newSelectedCoordinates => this.getPlace(newSelectedCoordinates)
    );
  }

  ngOnDestroy(): void {
    this.selectedCoordinatesSubscrption.unsubscribe();
  }

  private getPlace(coordinates: Coordinates) {
    this.selectedPlace = this.imageService.getPlace(coordinates);
  }
}
