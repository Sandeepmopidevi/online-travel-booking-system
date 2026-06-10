import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RatingPromptComponent } from './rating-prompt.component';

describe('RatingPromptComponent', () => {
  let component: RatingPromptComponent;
  let fixture: ComponentFixture<RatingPromptComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RatingPromptComponent]
    });
    fixture = TestBed.createComponent(RatingPromptComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
