import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BiddersTableComponent } from './bidders-table.component';

describe('BiddersTableComponent', () => {
  let component: BiddersTableComponent;
  let fixture: ComponentFixture<BiddersTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BiddersTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BiddersTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
