import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  constructor() {}

  @Input() image: string;//need to add a new class for image which will hold a small image and a full size one
  @Input() class: string;

  ngOnInit() {}
}
