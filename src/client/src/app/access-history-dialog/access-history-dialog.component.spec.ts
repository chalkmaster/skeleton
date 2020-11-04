import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessHistoryDialogComponent } from './access-history-dialog.component';

describe('AccessHistoryDialogComponent', () => {
  let component: AccessHistoryDialogComponent;
  let fixture: ComponentFixture<AccessHistoryDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AccessHistoryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccessHistoryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
