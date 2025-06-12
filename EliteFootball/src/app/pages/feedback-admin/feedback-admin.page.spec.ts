import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FeedbackAdminPage } from './feedback-admin.page';

describe('FeedbackAdminPage', () => {
  let component: FeedbackAdminPage;
  let fixture: ComponentFixture<FeedbackAdminPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
