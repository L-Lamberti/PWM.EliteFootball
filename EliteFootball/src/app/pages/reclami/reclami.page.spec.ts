import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReclamiPage } from './reclami.page';

describe('ReclamiPage', () => {
  let component: ReclamiPage;
  let fixture: ComponentFixture<ReclamiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ReclamiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
