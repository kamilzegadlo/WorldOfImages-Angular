import { Component, EventEmitter } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import {
  Coordinates,
  ImageService,
  PlaceComponent,
  SelectionStateService
} from '../barrel';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  interface ImageServiceMock {
    getPlace: jasmine.Spy;
  }
  interface SelectionStateServiceMock {
    selectedCoordinates: BehaviorSubject<Coordinates>;
  }

  @Component({
    selector: 'app-image',
    template: `<p>image</p>`
  })
  class MockImageComponent {}

  beforeEach(async(() => {
    const imageServiceMock: ImageServiceMock = {
      getPlace: jasmine
        .createSpy('getPlace')
        .and.returnValue({ x: 100, y: 150 })
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
        expect(imageServiceMock.getPlace.calls.count()).toBe(1);
        const params = imageServiceMock.getPlace.calls.argsFor(0);
        expect(params[0].x).toEqual(12);
        expect(params[0].y).toEqual(14);
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
        expect(imageServiceMock.getPlace.calls.count()).toBe(2);
        const params = imageServiceMock.getPlace.calls.argsFor(1);
        expect(params[0].x).toEqual(selectedCoordinates.x);
        expect(params[0].y).toEqual(selectedCoordinates.y);
      }
    )
  );
});
