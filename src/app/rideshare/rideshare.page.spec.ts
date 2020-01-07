import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RidesharePage } from './rideshare.page';

describe('RidesharePage', () => {
  let component: RidesharePage;
  let fixture: ComponentFixture<RidesharePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RidesharePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RidesharePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
