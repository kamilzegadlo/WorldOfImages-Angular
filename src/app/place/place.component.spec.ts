import { EventEmitter } from '@angular/core';
import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { Coordinates, ImageService, PlaceComponent, SelectionStateService } from '../barrel';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  type ImageServiceMock = { getPlace: jasmine.Spy };
  type SelectionStateServiceMock = { selectedCoordinates: BehaviorSubject<Coordinates> };

  beforeEach(async(() => {
    let imageServiceMock: ImageServiceMock = {
      getPlace: jasmine.createSpy('getPlace').and.returnValue({x:100, y:150}),
    };
    let selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new BehaviorSubject<Coordinates>({x:12, y:14}),
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

  it('when got coordinates, image service should be called', inject(
    [ImageService, SelectionStateService], 
    (imageServiceMock: ImageServiceMock, selectionStateServiceMock: SelectionStateServiceMock) => {
    //arrange & act
    const fixture = TestBed.createComponent(PlaceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    //assert
    expect(imageServiceMock.getPlace.calls.count()).toBe(2);
    let params=imageServiceMock.getPlace.calls.argsFor(0);
    expect(params[0].x).toEqual(12);
    expect(params[0].y).toEqual(14);
  }));

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
    selectionStateServiceMock.selectedCoordinates.next(selectedCoordinates);

    //assert
    expect(imageServiceMock.getPlace.calls.count()).toBe(4);
    let params=imageServiceMock.getPlace.calls.argsFor(2);
    expect(params[0].x).toEqual(selectedCoordinates.x);
    expect(params[0].y).toEqual(selectedCoordinates.y);
  }));
});
