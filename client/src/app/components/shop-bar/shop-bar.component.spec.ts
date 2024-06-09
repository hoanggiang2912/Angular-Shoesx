import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopBarComponent } from './shop-bar.component';

describe('ShopBarComponent', () => {
  let component: ShopBarComponent;
  let fixture: ComponentFixture<ShopBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopBarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
