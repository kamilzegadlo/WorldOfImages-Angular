import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { ImageService } from '../image.service';

@Component({
  selector: 'kz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor(private imageService: ImageService) {}

  ngOnInit() {
  }

  @Output() placeSelected = new EventEmitter();

  MapClicked = function(event){
    this.placeSelected.emit(this.imageService.getPlace(event.offsetX, event.offsetY));
  }

}
