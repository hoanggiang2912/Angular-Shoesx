import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroProductComponent } from './hero-product.component';

describe('HeroProductComponent', () => {
  let component: HeroProductComponent;
  let fixture: ComponentFixture<HeroProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroProductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeroProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
