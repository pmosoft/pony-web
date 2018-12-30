import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharsetComponent } from './charset.component';

describe('CharsetComponent', () => {
  let component: CharsetComponent;
  let fixture: ComponentFixture<CharsetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharsetComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharsetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
