import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-imageList',
  templateUrl: './imageList.component.html',
  styleUrls: ['./imageList.component.css']
})
export class ImageListComponent {
  private _expandedIndex: number | undefined;

  constructor() { }

  @Input() images: string[];

  //this will need to be amended that a new call for a bigger or full size image is called. 
  expandIndex(i: number | undefined) {
    if (this._expandedIndex === i) this.collapseIndex();
    else this._expandedIndex = i;
  }

  collapseIndex() {
    this._expandedIndex = undefined;
  }

  get expandedIndex(): number | undefined {
    return this._expandedIndex;
  }
}
