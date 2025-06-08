import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventiPage } from './eventi.page';

describe('EventiPage', () => {
  let component: EventiPage;
  let fixture: ComponentFixture<EventiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
