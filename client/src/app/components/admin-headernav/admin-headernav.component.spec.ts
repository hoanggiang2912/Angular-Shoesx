import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminHeadernavComponent } from './admin-headernav.component';

describe('AdminHeadernavComponent', () => {
  let component: AdminHeadernavComponent;
  let fixture: ComponentFixture<AdminHeadernavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminHeadernavComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminHeadernavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
