import { Component, EventEmitter, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
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
  }
  interface SelectionStateServiceMock {
    selectedCoordinates: BehaviorSubject<Coordinates>;
  }

  @Component({
    selector: 'app-image',
    template: `<p>image</p>`
  })
  class MockImageComponent {
    @Input() image: string;
  }

  beforeEach(async(() => {
    const imageServiceMock: ImageServiceMock = {
      getPlace: (coordinates: Coordinates): Observable<Place> => {
        if (coordinates.x === 11 && coordinates.y === 15) {
          return of({ x: 100, y: 150 } as Place);
        }
        if (coordinates.x === 12 && coordinates.y === 14) {
          return of({ x: 101, y: 151 } as Place);
        }
        return of({ x: 109, y: 159 } as Place);
      }
    };

    const selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new BehaviorSubject<Coordinates>({ x: 12, y: 14 })
    };

    TestBed.configureTestingModule({
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

  it(
    'when got coordinates, image service should be called',
    inject(
      [ImageService, SelectionStateService],
      (
        imageServiceMock: ImageServiceMock,
        selectionStateServiceMock: SelectionStateServiceMock
      ) => {
        // assert
        expect(101).toEqual(component.selectedPlace.x);
        expect(151).toEqual(component.selectedPlace.y);
      }
    )
  );

  it(
    'when received coordinates, image service should be called',
    inject(
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
      }
    )
  );
});
