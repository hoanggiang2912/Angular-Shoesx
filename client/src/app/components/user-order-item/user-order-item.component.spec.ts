import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserOrderItemComponent } from './user-order-item.component';

describe('UserOrderItemComponent', () => {
  let component: UserOrderItemComponent;
  let fixture: ComponentFixture<UserOrderItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserOrderItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UserOrderItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
