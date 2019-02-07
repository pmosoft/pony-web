import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabInfoExt2Component } from './tab-info-ext2.component';

describe('TabInfoExt2Component', () => {
  let component: TabInfoExt2Component;
  let fixture: ComponentFixture<TabInfoExt2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabInfoExt2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabInfoExt2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
