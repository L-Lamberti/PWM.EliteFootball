import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormazionePage } from './formazione.page';

describe('FormazionePage', () => {
  let component: FormazionePage;
  let fixture: ComponentFixture<FormazionePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(FormazionePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
