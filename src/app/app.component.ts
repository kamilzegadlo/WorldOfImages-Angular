import { Component } from '@angular/core';
import { Subject } from 'rxjs/Subject';

import { Place } from './place';
import { Coordinates } from './Coordinates';

@Component({
  selector: 'kz-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'World of Images';
}
