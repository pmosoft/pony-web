import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabQryListComponent } from './tab-qry-list.component';

describe('TabQryListComponent', () => {
  let component: TabQryListComponent;
  let fixture: ComponentFixture<TabQryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabQryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabQryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
