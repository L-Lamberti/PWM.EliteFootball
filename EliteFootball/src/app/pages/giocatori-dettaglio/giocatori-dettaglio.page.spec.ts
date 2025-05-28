import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiocatoriDettaglioPage } from './giocatori-dettaglio.page';

describe('GiocatoriDettaglioPage', () => {
  let component: GiocatoriDettaglioPage;
  let fixture: ComponentFixture<GiocatoriDettaglioPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GiocatoriDettaglioPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
