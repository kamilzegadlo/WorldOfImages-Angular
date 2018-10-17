import { Component, EventEmitter, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { FormsModule } from '@angular/forms'; // <-- NgModel lives here
import { HttpEvent, HttpResponse } from '@angular/common/http';

import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/observable';
import { of } from 'rxjs/observable/of';

import {
  Coordinates,
  ImageService,
  Place,
  PlaceComponent,
  SelectionStateService
} from '../barrel';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  interface ImageServiceMock {
    getPlace(coordinates: Coordinates): Observable<Place>;
    savePlace(place: Place): Observable<Place>;
    saveImage(
      image: any,
      coordinates: Coordinates
    ): Observable<HttpEvent<Object>>;
  }
  interface SelectionStateServiceMock {
    selectedCoordinates: Subject<Coordinates>;
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
    const imageServiceMock: ImageServiceMock = {
      getPlace: (coordinates: Coordinates): Observable<Place> => {
        if (coordinates.x === 11 && coordinates.y === 15) {
          return of({
            x: 100,
            y: 150,
            name: 'unit test name',
            isDefined: true
          } as Place);
        }
        if (coordinates.x === 12 && coordinates.y === 14) {
          return of({ x: 101, y: 151, isDefined: true } as Place);
        }
        if (coordinates.x === 14 && coordinates.y === 10) {
          return of({ x: 14, y: 10, isDefined: false, name: 'test' } as Place);
        }
        return of({ x: 109, y: 159, isDefined: true } as Place);
      },
      savePlace: (place: Place): Observable<Place> => {
        if (place.x === 14 && place.y === 10) {
          const p: Place = {
            isDefined: true,
            x: 999,
            y: 998,
            name: 'save test'
          };

          return of(p);
        }
        const p: Place = {
          isDefined: true,
          x: 4,
          y: 5,
          name: 'error'
        };

        return of(p);
      },
      saveImage: (
        image: File,
        coordinates: Coordinates
      ): Observable<HttpEvent<Object>> => {
        if (
          image.name === 'fileName' &&
          coordinates.x === 14 &&
          coordinates.y === 10
        ) {
          const place: Place = {
            isDefined: true,
            x: 112,
            y: 113,
            name: 'save test'
          };
          const httpResponse = new HttpResponse({ body: place });

          return of(httpResponse);
        }
        const place: Place = {
          isDefined: true,
          x: 1,
          y: 2,
          name: 'error'
        };
        const httpResponse = new HttpResponse({ body: place });

        return of(httpResponse);
      }
    };

    const selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new Subject<Coordinates>()
    };

    TestBed.configureTestingModule({
      imports: [FormsModule],
      providers: [
        { provide: ImageService, useValue: imageServiceMock },
        { provide: SelectionStateService, useValue: selectionStateServiceMock }
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
      imageServiceMock: ImageServiceMock,
      selectionStateServiceMock: SelectionStateServiceMock
    ) => {
      // assert
      expect(component.selectedPlace).toBeUndefined();
    }
  ));

  it('when received coordinates, image service should be called', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceMock: ImageServiceMock,
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
      imageServiceMock: ImageServiceMock,
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

  it('when received coordinatesof undefined place, input should be visible and enable', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceMock: ImageServiceMock,
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
      imageServiceMock: ImageServiceMock,
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

  it('when upload image, image service should be called', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceMock: ImageServiceMock,
      selectionStateServiceMock: SelectionStateServiceMock
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

      expect(112).toEqual(component.selectedPlace.x);
      expect(113).toEqual(component.selectedPlace.y);
      expect('save test').toEqual(component.selectedPlace.name);
    }
  ));

  it('when upload image, but image not specified the image service should not be called', inject(
    [ImageService, SelectionStateService],
    (
      imageServiceMock: ImageServiceMock,
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

      expect(14).toEqual(component.selectedPlace.x);
      expect(10).toEqual(component.selectedPlace.y);
      expect('test').toEqual(component.selectedPlace.name);
    }
  ));
});
