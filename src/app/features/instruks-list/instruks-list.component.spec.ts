import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InstruksListComponent } from './instruks-list.component';

describe('InstruksListComponent', () => {
  let component: InstruksListComponent;
  let fixture: ComponentFixture<InstruksListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InstruksListComponent]
    });
    fixture = TestBed.createComponent(InstruksListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
