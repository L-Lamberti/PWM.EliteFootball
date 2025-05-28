import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitazioniPage } from './citazioni.page';

describe('CitazioniPage', () => {
  let component: CitazioniPage;
  let fixture: ComponentFixture<CitazioniPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(CitazioniPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
