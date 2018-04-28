import { Input, Output, EventEmitter, Component } from '@angular/core';
import { TestBed, async } from '@angular/core/testing';

import { AppComponent, Coordinates, ImageService, MapComponent, PlaceComponent } from './barrel';

describe('AppComponent', () => {

  @Component({
    selector: 'kz-map',
    template: `<p>map</p>`
  })
  class MockMapComponent {
    @Output() selectedCoordinates = new EventEmitter();
    MapClicked() {};
  }

  @Component({
    selector: 'kz-place',
    template: `<p>place</p>`
  })
  class MockPlaceComponent {
    @Input() selectedCoordinates: Coordinates;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ImageService} ],
      declarations: [
        AppComponent, MockMapComponent, MockPlaceComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'World of Images'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('World of Images');
  }));

  it('should render message in a h1 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Click on any place on the map!');
  }));
});
