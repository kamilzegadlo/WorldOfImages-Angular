import { Component, EventEmitter, Input } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
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
  }
  interface SelectionStateServiceMock {
    selectedCoordinates: Subject<Coordinates>;
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
          return of({ x: 100, y: 150, name: 'unit test name' } as Place);
        }
        if (coordinates.x === 12 && coordinates.y === 14) {
          return of({ x: 101, y: 151 } as Place);
        }
        return of({ x: 109, y: 159 } as Place);
      }
    };

    const selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new Subject<Coordinates>()
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

  it('When no selected place, should render message, and no place name', async(() => {
    const compiled = fixture.debugElement.nativeElement;
    expect(
      compiled.querySelector('#noPlaceSelectedLabel').textContent
    ).toContain('Click on any place on the map!');
    expect(compiled.querySelector('#placeSelectedLabel')).toBeNull();
  }));

  it(
    'on init, selected place should be empty',
    inject(
      [ImageService, SelectionStateService],
      (
        imageServiceMock: ImageServiceMock,
        selectionStateServiceMock: SelectionStateServiceMock
      ) => {
        // assert
        expect(component.selectedPlace).toBeUndefined();
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
        expect('unit test name').toEqual(component.selectedPlace.name);
      }
    )
  );

  it(
    'when received coordinates, label should be replaced with place data',
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
        fixture.detectChanges();

        // assert
        const compiled = fixture.debugElement.nativeElement;
        expect(compiled.querySelector('#noPlaceSelectedLabel')).toBeNull();
        expect(
          compiled.querySelector('#placeSelectedLabel').textContent
        ).toContain('unit test name');
      }
    )
  );
});
