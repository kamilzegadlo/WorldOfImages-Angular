import { Component, Input } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageListComponent } from './imageList.component';

describe('ImageListComponent', () => {
  let component: ImageListComponent;
  let fixture: ComponentFixture<ImageListComponent>;

  @Component({
    selector: 'app-image',
    template: `<p>image</p>`
  })
  class MockImageComponent {
    @Input()
    image: string;
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MockImageComponent, ImageListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
