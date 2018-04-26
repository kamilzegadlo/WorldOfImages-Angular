import { Component, OnInit } from '@angular/core';

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

  MapClicked = function(event){
    let place = this.imageService.getPlace();
    //document.getElementById('output').innerHTML='X: ' + place.x + '<br>Y: ' + place.y;
  }

}
