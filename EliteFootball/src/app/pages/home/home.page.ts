import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { LayoutComponent } from "../../layout/layout.component";
import { FormazioneComponent } from './formazione/formazione.component';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule, LayoutComponent, FormazioneComponent]
})
export class HomePage {
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