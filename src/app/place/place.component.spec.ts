import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { PlaceComponent } from './place.component';
import { PLACE } from '../mock-place';
import { ImageService } from '../image.service';
import { Coordinates } from '../Coordinates';

describe('PlaceComponent', () => {
  let component: PlaceComponent;
  let fixture: ComponentFixture<PlaceComponent>;

  type ImageServiceMock = { getPlace: jasmine.Spy };

  beforeEach(async(() => {
    let imageServiceMock: ImageServiceMock = {
      getPlace: jasmine.createSpy('getPlace').and.returnValue({x:100, y:150}),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService, useValue: imageServiceMock } ],
      declarations: [ PlaceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaceComponent);
    component = fixture.componentInstance;
    component.selectedCoordinates=PLACE;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('when got coordinates, image service should be called', inject(
    [ImageService], (imageServiceMock: ImageServiceMock) => {
    //arrange & act
    const fixture = TestBed.createComponent(PlaceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    //assert
    expect(imageServiceMock.getPlace.calls.count()).toBe(1);
    let params=imageServiceMock.getPlace.calls.argsFor(0);
    expect(params[0]).toEqual(13);
    expect(params[1]).toEqual(7);
  }));

  it('when received coordinates, image service should be called', inject(
    [ImageService], (imageServiceMock: ImageServiceMock) => {
    //arrange
    const fixture = TestBed.createComponent(PlaceComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    let selectedCoordinates: Coordinates={
      x: 11,
      y: 15
    };

    //act
    component.selectedCoordinates =selectedCoordinates;

    //assert
    expect(imageServiceMock.getPlace.calls.count()).toBe(2);
    let params=imageServiceMock.getPlace.calls.argsFor(1);
    expect(params[0]).toEqual(11);
    expect(params[1]).toEqual(15);
  }));
});
