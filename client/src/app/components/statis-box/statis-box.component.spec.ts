import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisBoxComponent } from './statis-box.component';

describe('StatisBoxComponent', () => {
  let component: StatisBoxComponent;
  let fixture: ComponentFixture<StatisBoxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatisBoxComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(StatisBoxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
