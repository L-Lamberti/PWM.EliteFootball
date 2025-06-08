import { ComponentFixture, TestBed } from '@angular/core/testing';
import { H2HPage } from './h2h.page';

describe('H2HPage', () => {
  let component: H2HPage;
  let fixture: ComponentFixture<H2HPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(H2HPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
