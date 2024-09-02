import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateLevelComponent } from './update-level.component';

describe('UpdateLevelComponent', () => {
  let component: UpdateLevelComponent;
  let fixture: ComponentFixture<UpdateLevelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpdateLevelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpdateLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
