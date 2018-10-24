import { Component, EventEmitter, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpEvent, HttpResponse, HttpClient, HttpHandler } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import {
  Coordinates,
  ImageService,
  Place,
  PlaceComponent,
  SelectionStateService,
  MultiFileUploader,
  MessageType,
  ImageServiceStub
} from '../barrel';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  interface SelectionStateServiceMock {
    selectedCoordinates: Subject<Coordinates>;
  }

  interface MultiFileUploaderMock {
    upload(images: File[], place: Place, imageService: ImageService, onSuccessImageLoad: (place: Place) => void, onFailureImageLoad: () => void): void;
  }

  @Component({
    selector: 'app-image',
    template: `<p>image</p>`
  })
  class MockImageComponent {
    @Input()
    image: string;
  }

  beforeEach(async(() => {
    const selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new Subject<Coordinates>()
    };

    const multiFileUploaderMock: MultiFileUploaderMock = {
      upload(images: File[], place: Place, imageService: ImageService, onSuccessImageLoad: (place: Place) => void, onFailureImageLoad: () => void) {
        debugger;
        if (place.x == 14 && place.y === 10) {
          place.images = ['testimage'];
          onSuccessImageLoad(place);
        }
        if (place.x === 15 && place.y === 11) {
          onFailureImageLoad();
        }

      }
    }

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        HttpClient,
        HttpHandler,
        { provide: ImageService, useClass: ImageServiceStub },
        { provide: SelectionStateService, useValue: selectionStateServiceMock },
        { provide: MultiFileUploader, useValue: multiFileUploaderMock }
      ],
      declarations: [MockImageComponent, PlaceComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('When no selected place, should render message, and no place name', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('#noPlaceSelectedLabel').textContent
    ).toContain('Click on any place on the map!');
    expect(compiled.querySelector('#placeSelectedLabel')).toBeNull();
    expect(compiled.querySelector('#newPlaceName')).toBeNull();
  }));

  it('on init, selected place should be empty', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // assert
      expect(component.selectedPlace).toBeUndefined();
    }
  ));

  it('when received coordinates, image service should be called', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // arrange
      const selectedCoordinates: Coordinates = {
        x: 11,
        y: 15
      };

      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);

      // assert
      expect(100).toEqual(component.selectedPlace.x);
      expect(150).toEqual(component.selectedPlace.y);
      expect('unit test name').toEqual(component.selectedPlace.name);
    }
  ));

  it('when received coordinates of defined place, label should be replaced with place data', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // arrange
      const selectedCoordinates: Coordinates = {
        x: 11,
        y: 15
      };

      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);
      fixture.detectChanges();

      // assert
      const compiled = fixture.debugElement.nativeElement;
      expect(compiled.querySelector('#noPlaceSelectedLabel')).toBeNull();
      expect(compiled.querySelector('#newPlaceName')).toBeNull();
      expect(
        compiled.querySelector('#placeSelectedLabel').textContent
      ).toContain('unit test name');
    }
  ));

  it('when received coordinates of undefined place, input should be visible and enable', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // arrange
      const selectedCoordinates: Coordinates = {
        x: 14,
        y: 10
      };

      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);
      fixture.detectChanges();

      // assert
      fixture.whenStable().then(() => {
        // expect it to be the uppercase version
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#noPlaceSelectedLabel')).toBeNull();
        fixture.detectChanges();
        expect(compiled.querySelector('#newPlaceName').value).toContain('test');
        expect(compiled.querySelector('#saveNewPlace')).toBeDefined();
      });
    }
  ));

  it('when click save, image service should be called', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // arrange
      const selectedCoordinates: Coordinates = {
        x: 14,
        y: 10
      };
      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);
      component.savePlace();

      expect(999).toEqual(component.selectedPlace.x);
      expect(998).toEqual(component.selectedPlace.y);
      expect('save test').toEqual(component.selectedPlace.name);
    }
  ));

  it('when upload image, MultiFileUploader should be called', inject(
    [ImageService, SelectionStateService, MultiFileUploader],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock,
      multiFileUploaderMock: MultiFileUploaderMock
    ) => {
      const selectedCoordinates: Coordinates = {
        x: 14,
        y: 10
      };
      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);

      component.onFileChanged({
        target: { files: [new File([], 'fileName')] }
      });

      if (component && component.selectedPlace && component.selectedPlace.images) {
        expect(component.selectedPlace.images.length).toEqual(1);
      } else {
        fail('component && component.selectedPlace && component.selectedPlace.images should be defined')
      }
      if (component.userMessage) {
        expect(component.userMessage.message).toEqual("Your picture has been added to this place!");
        expect(component.userMessage.messageType).toEqual(MessageType.Success);
      }
      else {
        fail('component.userMessage')
      }
    }
  ));

  it('when upload image, but image not specified the MultiFileUploader should not be called', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      const selectedCoordinates: Coordinates = {
        x: 14,
        y: 10
      };
      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);

      component.onFileChanged({
        target: { files: [] }
      });

      expect(component.selectedPlace.images).not.toBeDefined();
      expect(component.userMessage).not.toBeDefined();
    }
  ));

  it('when error occured during retrieving a place, error message should be displayed', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // arrange
      const selectedCoordinates: Coordinates = {
        x: 901,
        y: 601
      };

      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);

      // assert
      if (component.userMessage) {
        expect('There was a unit test error!').toEqual(component.userMessage.message);
        expect(MessageType.Error).toEqual(component.userMessage.messageType);
      } else {
        fail("component.userMessage undefined!");
      }
    }
  ));

  it('when error occured during saving a place, error message should be displayed', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // arrange
      const selectedCoordinates: Coordinates = {
        x: 902,
        y: 602,
      };
      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);
      component.savePlace();

      if (component.userMessage) {
        expect('There was a unit test error during saving!').toEqual(component.userMessage.message);
        expect(MessageType.Error).toEqual(component.userMessage.messageType);
      } else {
        fail("component.userMessage undefined!");
      }
    }
  ));

  it('when upload image and MultiFileUploader returns error', inject(
    [ImageService, SelectionStateService, MultiFileUploader],
    (
      imageServiceStub: ImageServiceStub,
      selectionStateServiceMock: SelectionStateServiceMock,
      multiFileUploaderMock: MultiFileUploaderMock
    ) => {
      const selectedCoordinates: Coordinates = {
        x: 15,
        y: 11
      };
      // act
      selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);

      debugger;
      component.onFileChanged({
        target: { files: [new File([], 'fileName')] }
      });

      if (component && component.selectedPlace) {
        expect(component.selectedPlace.images).not.toBeDefined();
      } else {
        fail('component && component.selectedPlace should be defined')
      }
      if (component.userMessage) {
        expect(component.userMessage.message).toEqual("Error while uploading your image. Try again.");
        expect(component.userMessage.messageType).toEqual(MessageType.Error);
      }
      else {
        fail('component.userMessage')
      }
    }
  ));
});
