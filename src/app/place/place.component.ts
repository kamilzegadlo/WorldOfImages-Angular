import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  trigger,
  style,
  animate,
  transition,
  sequence
} from '@angular/animations';

import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/timer';

import {
  Coordinates,
  Place,
  ImageService,
  PlaceService,
  MultiFileUploader,
  SelectionStateService,
  UserMessage,
  MessageType,
  ActionResult
} from '../barrel';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  animations: [
    trigger('userMessageAnimation', [
      transition(
        ':leave',
        sequence([
          style({opacity: 0.9}),
          animate('15s', style({ opacity: 0 })),
          animate('1s', style({ height: '0px' }))
        ])
      )
    ]),
    trigger('noPlaceAnimation', [
      transition(
        ':leave', [
          animate('0.5s', style({ height: '0px', overflow: 'hidden' }))
        ]
      )
    ]),
    trigger('placeNotDefinedAnimation', [
      transition(':enter', sequence([
        style({ height: 0, overflow: 'hidden' }),
        animate('0.5s'),
        animate('0.5s', style({ height: '100%', overflow: 'hidden' }))
      ])),
      transition(
        ':leave', [
          animate('0.5s', style({ height: '0px', overflow: 'hidden' }))
        ]
      )
    ]),
    trigger('placeDefinedAnimation', [
      transition(':enter', sequence([
        style({ height: 0, overflow: 'hidden' }),
        animate('0.5s'),
        animate('0.5s', style({ height: '100%', overflow: 'hidden' }))
      ])),
      transition(
        ':leave', [
          animate('0.5s', style({ height: '0px', overflow: 'hidden' }))
        ]
      )
    ])
  ]
})
export class PlaceComponent implements OnInit, OnDestroy {
  private _selectedPlace: Place|undefined;
  private selectedCoordinatesSubscrption: Subscription;
  private selectedPlaceSubscrption: Subscription;
  private _userMessage: UserMessage | undefined = undefined;
  public newPlaceName: string;
  MessageType = MessageType;

  get selectedPlace(): Place|undefined {
    return this._selectedPlace;
  }

  get userMessage(): UserMessage | undefined {
    return this._userMessage;
  }

  constructor(
    private imageService: ImageService,
    private placeService: PlaceService,
    private selectionStateService: SelectionStateService,
    private multiFileUploader: MultiFileUploader
  ) {
    this.SetNoPlace();
   }

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
    this.selectedPlaceSubscrption = this.placeService
      .getPlace(coordinates)
      .subscribe(getPlaceResponse => {
        if (getPlaceResponse.isSuccess && getPlaceResponse.result) {
          this._selectedPlace = getPlaceResponse.result;
          if (!this._selectedPlace.isDefined) {
            this.newPlaceName = 'New place';
          }
        } else {
          this.setUserMessage(
            <string>getPlaceResponse.errorMessage,
            MessageType.Error
          );
        }
      });
  }

  savePlace() {
    if(this._selectedPlace){
      this.placeService
        .savePlace(
        new Place(
          this._selectedPlace.x,
          this._selectedPlace.y,
          this.newPlaceName,
          false
        )
        )
        .subscribe(savePlaceResponse => {
          if (savePlaceResponse.isSuccess && savePlaceResponse.result) {
            this._selectedPlace = savePlaceResponse.result;
            this.setUserMessage(
              'You have named this place!',
              MessageType.Success
            );
          } else {
            this.setUserMessage(
              <string>savePlaceResponse.errorMessage,
              MessageType.Error
            );
          }
        });
    }
  }

  private setUserMessage(message: string, type: MessageType) {
    this._userMessage = {
      message: message,
      messageType: type
    };
    this.hideUserMessage();
  }

  private hideUserMessage() {
    Observable.timer(0).subscribe(() => (this._userMessage = undefined));
  }

  private onImageLoad(response: ActionResult<string>) {
    if (response.isSuccess && response.result) {
      this.onSuccessImageLoad(response.result);
    } else {
      this.onFailureImageLoad();
    }
  }

  private onSuccessImageLoad(image: string) {
    if(this._selectedPlace){
      this._selectedPlace.addImage(image);
      this.setUserMessage(
        'Your picture has been added to this place!',
        MessageType.Success
      );
    }
  }

  private onFailureImageLoad() {
    this.setUserMessage(
      'Error while uploading your image. Try again.',
      MessageType.Error
    );
  }

  onFileChanged(change: any) {
    if (change.target.files.length > 0 && this._selectedPlace) {
      this.multiFileUploader
        .upload(change.target.files, this._selectedPlace, this.imageService)
        .subscribe(
        this.onImageLoad.bind(this),
        this.onFailureImageLoad.bind(this)
        );
    }
  }

  collapsePlace(){
    this.SetNoPlace();
  }

  private SetNoPlace(){
    this._selectedPlace=undefined;
    this.setUserMessage(
      'Click on any place on the map!',
      MessageType.Info
    );
  }
}
