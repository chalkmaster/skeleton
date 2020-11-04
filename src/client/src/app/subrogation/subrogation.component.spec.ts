import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubrogationComponent } from './subrogation.component';

describe('SubrogationComponent', () => {
  let component: SubrogationComponent;
  let fixture: ComponentFixture<SubrogationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubrogationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubrogationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
