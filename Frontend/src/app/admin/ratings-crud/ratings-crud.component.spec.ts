import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingsCrudComponent } from './ratings-crud.component';

describe('RatingsCrudComponent', () => {
  let component: RatingsCrudComponent;
  let fixture: ComponentFixture<RatingsCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingsCrudComponent]
    });
    fixture = TestBed.createComponent(RatingsCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
