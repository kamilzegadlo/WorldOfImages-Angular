import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  // ...
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import {
  Coordinates,
  Place,
  ImageService,
  SelectionStateService,
  UserMessage,
  MessageType
} from '../barrel';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  animations: [
    trigger('userMessageAnimation', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('15s', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class PlaceComponent implements OnInit, OnDestroy {
  private _selectedPlace: Place;
  private selectedCoordinatesSubscrption: Subscription;
  private selectedPlaceSubscrption: Subscription;
  private _expandedIndex: number | undefined;
  private _userMessage: UserMessage;
  MessageType=MessageType;

  expandIndex(i:number | undefined){
    if(this._expandedIndex===i)
      this.collapseIndex();
    else
      this._expandedIndex=i;
  }
  collapseIndex(){
    this._expandedIndex=undefined;
  }

  get selectedPlace(): Place {
    return this._selectedPlace;
  }

  get expandedIndex(): number | undefined {
    return this._expandedIndex;
  }

  get userMessage(): UserMessage {
    return this._userMessage;
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

  savePlace() {
    this.imageService
      .savePlace(this._selectedPlace)
      .subscribe(selectedPlace => {
        this._selectedPlace = selectedPlace;
        this._userMessage = {
          message:"You have named this place!",
          messageType:MessageType.Success
        };
        this.hideUserMessage();
      });
  }

  hideUserMessage() {
    Observable.timer(1500).subscribe(()=>this._userMessage=undefined);
  }

  onFileChanged(change: any) {
    this.imageService
      .saveImage(change.target.files[0], this._selectedPlace)
      .subscribe(httpResponse => {
        if (httpResponse.type === HttpEventType.UploadProgress) {
          // {
          // loaded:11, // Number of bytes uploaded or downloaded.
          // total :11 // Total number of bytes to upload or download
          // }
        }

        if (httpResponse.type === HttpEventType.Response && httpResponse.body) {
          this._selectedPlace = <Place>httpResponse.body;
          this._userMessage = {
            message:"Your picture has been added to this place!",
            messageType:MessageType.Success
          };
          this.hideUserMessage();
        }
      });
  }
}
