import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { SelezioneGiocatoreComponent } from './selezione-giocatore.component';

describe('SelezioneGiocatoreComponent', () => {
  let component: SelezioneGiocatoreComponent;
  let fixture: ComponentFixture<SelezioneGiocatoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [SelezioneGiocatoreComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelezioneGiocatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
