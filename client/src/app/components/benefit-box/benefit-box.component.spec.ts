import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitBoxComponent } from './benefit-box.component';

describe('BenefitBoxComponent', () => {
  let component: BenefitBoxComponent;
  let fixture: ComponentFixture<BenefitBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BenefitBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BenefitBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
