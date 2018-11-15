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

  it('expandIndex should be undefined on init', () => {
    expect(component.expandedIndex).toBeUndefined();
  });

  it('expandIndex should be set to 1', () => {
    component.expandIndex(1);
    expect(component.expandedIndex).toEqual(1);
  });

  it('expandIndex should be undefiend if clicked twice', () => {
    component.expandIndex(1);
    component.expandIndex(1);
    expect(component.expandedIndex).toBeUndefined();
  });

  it('collapseIndex should do nothing if expanded index was not set before', () => {
    component.collapseIndex();
    expect(component.expandedIndex).toBeUndefined();
  });

  it('collapseIndex should set expandedindex to undefined', () => {
    component.expandIndex(1);
    component.collapseIndex();
    expect(component.expandedIndex).toBeUndefined();
  });
});
