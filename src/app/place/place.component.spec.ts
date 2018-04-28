import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Coordinates, ImageService, PlaceComponent, PLACE, SelectionStateService } from '../barrel';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  type ImageServiceMock = { getPlace: jasmine.Spy };
  type SelectionStateServiceMock = { selectedCoordinates: EventEmitter<Coordinates> };

  beforeEach(async(() => {
    let imageServiceMock: ImageServiceMock = {
      getPlace: jasmine.createSpy('getPlace').and.returnValue({x:100, y:150}),
    };
    let selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new EventEmitter<Coordinates>(),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService, useValue: imageServiceMock },
        {provide: SelectionStateService, useValue: selectionStateServiceMock} ],
      declarations: [ PlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when received coordinates, image service should be called', inject(
    [ImageService, SelectionStateService], 
    (imageServiceMock: ImageServiceMock, selectionStateServiceMock: SelectionStateServiceMock) => {
    //arrange
    const fixture = TestBed.createComponent(PlaceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    let selectedCoordinates: Coordinates={
      x: 11,
      y: 15
    };

    //act
    selectionStateServiceMock.selectedCoordinates.emit(selectedCoordinates);

    //assert
    expect(imageServiceMock.getPlace.calls.count()).toBe(2);
    let params=imageServiceMock.getPlace.calls.argsFor(0);
    expect(params[0].x).toEqual(selectedCoordinates.x);
    expect(params[0].y).toEqual(selectedCoordinates.y);
  }));
});
