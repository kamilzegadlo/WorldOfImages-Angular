import { Component, OnInit, Input } from '@angular/core';

import { ImageService } from '../image.service';
import { Place } from '../place';
import { Coordinates } from '../Coordinates';
import { PLACE } from '../mock-place';

@Component({
  selector: 'kz-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  constructor(private imageService: ImageService) { }

  ngOnInit() {
    this.selectedPlace=PLACE;
  }

  private selectedPlace: Coordinates;
  @Input('selectedCoordinates') set selectedCoordinates(selectedCoordinates: Coordinates) {
    if(this.imageService && selectedCoordinates)
      this.selectedPlace = this.imageService.getPlace(selectedCoordinates.x, selectedCoordinates.y);
  }


}
