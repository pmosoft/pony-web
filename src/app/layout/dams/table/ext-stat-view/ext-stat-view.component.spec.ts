import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtStatViewComponent } from './ext-stat-view.component';

describe('ExtStatViewComponent', () => {
  let component: ExtStatViewComponent;
  let fixture: ComponentFixture<ExtStatViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtStatViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtStatViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
