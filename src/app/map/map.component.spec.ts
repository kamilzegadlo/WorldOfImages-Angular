import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { SelectionStateService } from '../selection-state.service';
import { EventEmitter } from '@angular/core';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  type SelectionStateServiceMock = { selectedCoordinates: EventEmitter<Coordinates> };

  beforeEach(async(() => {
    let selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new EventEmitter<Coordinates>()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SelectionStateService, useValue: selectionStateServiceMock } ],
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

  it('should emit the selected coordinates', inject(
    [SelectionStateService], (selectionStateServiceMock: SelectionStateServiceMock) => {
    const fixture = TestBed.createComponent(MapComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    let emitSpy = spyOn(selectionStateServiceMock.selectedCoordinates, 'emit');

    //Act
    component.MapClicked({offsetX:14, offsetY:8});
    
    //Assert
    expect(emitSpy).toHaveBeenCalled();
    expect(emitSpy.calls.count()).toBe(1);
    let params=emitSpy.calls.argsFor(0);
    expect(params[0].x).toEqual(14);
    expect(params[0].y).toEqual(8);
  }));

});
