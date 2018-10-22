import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition,
  sequence,
  // ...
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import {
  Coordinates,
  Place,
  ImageService,
  MultiFileUploader,
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
        animate('0s', style({ opacity: 1 }))
      ]),
      transition(':leave', sequence([
        animate('15s', style({ opacity: 0 })),
        animate('2s', style({ height: '0px' })),
      ]))
    ])
  ]
})
export class PlaceComponent implements OnInit, OnDestroy {
  private _selectedPlace: Place;
  private selectedCoordinatesSubscrption: Subscription;
  private selectedPlaceSubscrption: Subscription;
  private _expandedIndex: number | undefined;
  private _userMessage: UserMessage | undefined = undefined;
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

  get userMessage(): UserMessage | undefined {
    return this._userMessage;
  }

  constructor(
    private imageService: ImageService,
    private selectionStateService: SelectionStateService,
    private multiFileUploader: MultiFileUploader
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
      .subscribe(getPlaceResponse => {
        if(getPlaceResponse.isSuccess){
          this._selectedPlace = <Place>getPlaceResponse.place
        } else {
          this._userMessage = {
            message:<string>getPlaceResponse.errorMessage,
            messageType:MessageType.Error
          };
          this.hideUserMessage();
        }
      });
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

  private hideUserMessage() {
    Observable.timer(0).subscribe(()=>this._userMessage=undefined);
  }

  private onSuccessImageLoad(place: Place){
      this._selectedPlace = place;
      this._userMessage = {
        message:"Your picture has been added to this place!",
        messageType:MessageType.Success
      };
      this.hideUserMessage();
  }

  onFileChanged(change: any) {
    if(change.target.files.length>0)
    {
      this.multiFileUploader.upload(change.target.files, this._selectedPlace, this.imageService, this.onSuccessImageLoad.bind(this));
    }
  }

}
