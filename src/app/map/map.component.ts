import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'kz-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  MapClicked = function(event){
    document.getElementById('output').innerHTML='X: ' + event.offsetX + '<br>Y: ' + event.offsetY;
  }

}
