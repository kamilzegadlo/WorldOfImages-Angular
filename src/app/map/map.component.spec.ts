import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { ImageService } from '../image.service';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  type ImageServiceMock = { getPlace: jasmine.Spy };

  beforeEach(async(() => {
    let imageServiceMock: ImageServiceMock = {
      getPlace: jasmine.createSpy('getPlace').and.returnValue({x:100, y:150}),
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService, useValue: imageServiceMock } ],
      declarations: [ MapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render world map image', async(() => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#WorldMap')).not.toBeUndefined();
  }));

  it('when clicked, image service should be called', inject(
    [ImageService], (imageServiceMock: ImageServiceMock) => {
    //arrange
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    component = fixture.componentInstance;

    let event={
      offsetX: 11,
      offsetY: 15
    };

    //act
    component.MapClicked(event);

    //assert
    expect(imageServiceMock.getPlace.calls.count()).toBe(1);
    let params=imageServiceMock.getPlace.calls.argsFor(0);
    expect(params[0]).toEqual(11);
    expect(params[1]).toEqual(15);
    //unit test event emiter was called?
  }));

});
