import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SupportTicketCrudComponent } from './support-ticket-crud.component';

describe('SupportTicketCrudComponent', () => {
  let component: SupportTicketCrudComponent;
  let fixture: ComponentFixture<SupportTicketCrudComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SupportTicketCrudComponent]
    });
    fixture = TestBed.createComponent(SupportTicketCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
