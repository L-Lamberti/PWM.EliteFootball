import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GiocatoriPage } from './giocatori.page';

describe('GiocatoriPage', () => {
  let component: GiocatoriPage;
  let fixture: ComponentFixture<GiocatoriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(GiocatoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
