import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItineraryCrudComponent } from './itinerary-crud.component';

describe('ItineraryCrudComponent', () => {
  let component: ItineraryCrudComponent;
  let fixture: ComponentFixture<ItineraryCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ItineraryCrudComponent]
    });
    fixture = TestBed.createComponent(ItineraryCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
