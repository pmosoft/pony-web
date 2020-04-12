import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JavaVoComponent } from './java-vo.component';

describe('JavaVoComponent', () => {
  let component: JavaVoComponent;
  let fixture: ComponentFixture<JavaVoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JavaVoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JavaVoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
