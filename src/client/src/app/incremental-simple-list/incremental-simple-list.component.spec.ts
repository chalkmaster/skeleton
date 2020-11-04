import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncrementalSimpleListComponent } from './incremental-simple-list.component';

describe('IncrementalSimpleListComponent', () => {
  let component: IncrementalSimpleListComponent;
  let fixture: ComponentFixture<IncrementalSimpleListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncrementalSimpleListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncrementalSimpleListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
