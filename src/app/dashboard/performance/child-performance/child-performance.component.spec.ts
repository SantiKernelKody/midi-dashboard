import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChildPerformanceComponent } from './child-performance.component';

describe('ChildPerformanceComponent', () => {
  let component: ChildPerformanceComponent;
  let fixture: ComponentFixture<ChildPerformanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChildPerformanceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChildPerformanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
