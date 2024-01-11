import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LimiterThresholdPage } from './limiter-threshold.page';

describe('LimiterThresholdPage', () => {
  let component: LimiterThresholdPage;
  let fixture: ComponentFixture<LimiterThresholdPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(LimiterThresholdPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
