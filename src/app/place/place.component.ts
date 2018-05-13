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
  private _selectedPlace: Place;
  private selectedCoordinatesSubscrption: Subscription;
  private selectedPlaceSubscrption: Subscription;

  get selectedPlace(): Place {
    return this._selectedPlace;
  }

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
    this.selectedPlaceSubscrption.unsubscribe();
  }

  private getPlace(coordinates: Coordinates) {
    this.selectedPlaceSubscrption = this.imageService
      .getPlace(coordinates)
      .subscribe(selectedPlace => (this._selectedPlace = selectedPlace));
  }
}
