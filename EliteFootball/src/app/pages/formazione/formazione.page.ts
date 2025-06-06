import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { FormazioneComponent } from './formazione-component/formazione.component';

@Component({
  standalone: true,
  selector: 'app-formazioni',
  templateUrl: 'formazione.page.html',
  styleUrls: ['formazione.page.scss'],
  imports: [IonicModule, CommonModule, FormazioneComponent]
})
export class FormazionePage {
mostraFormazione = false;
  moduloSelezionato: string | null = null;

  openFormazione(modulo: string) {
    this.moduloSelezionato = modulo;
    this.mostraFormazione = true;
  }

  chiudiFormazione() {
    this.mostraFormazione = false;
    this.moduloSelezionato = null;
  }
}