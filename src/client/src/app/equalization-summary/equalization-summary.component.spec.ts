import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EqualizationSummaryComponent } from './equalization-summary.component';

describe('EqualizationSummaryComponent', () => {
  let component: EqualizationSummaryComponent;
  let fixture: ComponentFixture<EqualizationSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EqualizationSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EqualizationSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
