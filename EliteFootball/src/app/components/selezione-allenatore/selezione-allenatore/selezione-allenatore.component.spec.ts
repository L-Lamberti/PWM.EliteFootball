import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelezioneAllenatoreComponent } from './selezione-allenatore.component';

describe('SelezioneAllenatoreComponent', () => {
  let component: SelezioneAllenatoreComponent;
  let fixture: ComponentFixture<SelezioneAllenatoreComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SelezioneAllenatoreComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelezioneAllenatoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
