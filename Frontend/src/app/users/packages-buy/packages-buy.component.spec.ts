import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PackagesBuyComponent } from './packages-buy.component';

describe('PackagesBuyComponent', () => {
  let component: PackagesBuyComponent;
  let fixture: ComponentFixture<PackagesBuyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PackagesBuyComponent]
    });
    fixture = TestBed.createComponent(PackagesBuyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
