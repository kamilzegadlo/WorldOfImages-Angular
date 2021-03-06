import { EventEmitter } from '@angular/core';
import {
  async,
  ComponentFixture,
  TestBed,
  inject
} from '@angular/core/testing';

import { MapComponent, SelectionStateService } from '../barrel';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  interface SelectionStateServiceMock {
    selectedCoordinates: EventEmitter<Coordinates>;
  }

  beforeEach(async(() => {
    const selectionStateServiceMock: SelectionStateServiceMock = {
      selectedCoordinates: new EventEmitter<Coordinates>()
    };

    TestBed.configureTestingModule({
      providers: [
        { provide: SelectionStateService, useValue: selectionStateServiceMock }
      ],
      declarations: [MapComponent]
    }).compileComponents();
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
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('#WorldMap')).not.toBeUndefined();
  }));

  it(
    'should emit the selected coordinates',
    inject(
      [SelectionStateService],
      (selectionStateServiceMock: SelectionStateServiceMock) => {
        const nextSpy = spyOn(
          selectionStateServiceMock.selectedCoordinates,
          'next'
        );

        // Act
        component.MapClicked({ offsetX: 14, offsetY: 8 });

        // Assert
        expect(nextSpy).toHaveBeenCalled();
        expect(nextSpy.calls.count()).toBe(1);
        const params = nextSpy.calls.argsFor(0);
        expect(params[0].x).toEqual(14);
        expect(params[0].y).toEqual(8);
      }
    )
  );
});
