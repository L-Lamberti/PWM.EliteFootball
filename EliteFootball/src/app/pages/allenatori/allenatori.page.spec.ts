import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AllenatoriPage } from './allenatori.page';

describe('AllenatoriPage', () => {
  let component: AllenatoriPage;
  let fixture: ComponentFixture<AllenatoriPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AllenatoriPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
