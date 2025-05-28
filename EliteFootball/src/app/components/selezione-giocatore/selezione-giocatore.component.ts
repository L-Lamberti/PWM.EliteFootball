import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-selezione-giocatore',
  standalone: true,
  imports: [CommonModule, IonicModule],
  templateUrl: './selezione-giocatore.component.html',
  styleUrls: ['./selezione-giocatore.component.scss'],
})
export class SelezioneGiocatoreComponent implements OnInit {
  @Input() ruolo!: string;
  giocatori: any[] = [];

  constructor(private api: ApiService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.api.getTopGiocatori(this.ruolo).subscribe(res => {
      this.giocatori = res;
    });
  }

  seleziona(giocatore: any) {
    this.modalCtrl.dismiss(giocatore);
  }

  annulla() {
    this.modalCtrl.dismiss();
  }
}

