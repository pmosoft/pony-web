import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JdbcRegComponent } from './jdbc-reg.component';

describe('JdbcRegComponent', () => {
  let component: JdbcRegComponent;
  let fixture: ComponentFixture<JdbcRegComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JdbcRegComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JdbcRegComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
