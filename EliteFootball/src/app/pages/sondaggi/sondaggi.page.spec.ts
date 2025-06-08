import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SondaggiPage } from './sondaggi.page';

describe('SondaggiPage', () => {
  let component: SondaggiPage;
  let fixture: ComponentFixture<SondaggiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SondaggiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
