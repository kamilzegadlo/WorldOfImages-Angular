import { Component, OnDestroy, OnInit, Input } from '@angular/core';
import {
  trigger,
  state,
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
  MultiFileUploader,
  SelectionStateService,
  UserMessage,
  MessageType,
  FocusDirective,
  ActionResult
} from '../barrel';
import { isSuccess } from 'angular-in-memory-web-api';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css'],
  animations: [
    trigger('userMessageAnimation', [
      transition(
        ':leave',
        sequence([
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
  private _selectedPlace: Place;
  private selectedCoordinatesSubscrption: Subscription;
  private selectedPlaceSubscrption: Subscription;
  private _expandedIndex: number | undefined;
  private _userMessage: UserMessage | undefined = undefined;
  public newPlaceName: string;
  MessageType = MessageType;

  expandIndex(i: number | undefined) {
    if (this._expandedIndex === i) this.collapseIndex();
    else this._expandedIndex = i;
  }
  collapseIndex() {
    this._expandedIndex = undefined;
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
  ) { }

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
    this.imageService
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
    this._selectedPlace.addImage(image);
    this.setUserMessage(
      'Your picture has been added to this place!',
      MessageType.Success
    );
  }

  private onFailureImageLoad() {
    this.setUserMessage(
      'Error while uploading your image. Try again.',
      MessageType.Error
    );
  }

  onFileChanged(change: any) {
    if (change.target.files.length > 0) {
      this.multiFileUploader
        .upload(change.target.files, this._selectedPlace, this.imageService)
        .subscribe(
        this.onImageLoad.bind(this),
        this.onFailureImageLoad.bind(this)
        );
    }
  }
}
