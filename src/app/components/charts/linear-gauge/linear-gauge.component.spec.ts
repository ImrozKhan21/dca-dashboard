import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinearGaugeComponent } from './linear-gauge.component';

describe('LinearGaugeComponent', () => {
  let component: LinearGaugeComponent;
  let fixture: ComponentFixture<LinearGaugeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LinearGaugeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LinearGaugeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
