import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlTabComponent } from './etl-tab.component';

describe('EtlTabComponent', () => {
  let component: EtlTabComponent;
  let fixture: ComponentFixture<EtlTabComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EtlTabComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EtlTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
