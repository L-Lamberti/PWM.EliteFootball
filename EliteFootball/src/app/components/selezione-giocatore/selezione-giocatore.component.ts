import { Component, Input, OnInit } from '@angular/core';
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
  @Input() giocatoriSelezionati: number[] = [];
  giocatori: any[] = [];
  listaGiocatori: any[] = []; // popolata da un servizio o mock

  ruoloNomi: { [key: string]: string } = {
    POR: 'Portiere',
    DC: 'Difensore Centrale',
    TD: 'Terzino Destro',
    TS: 'Terzino Sinistro',
    CDC: 'Centrocampista Difensivo',
    CC: 'Centrocampista Centrale',
    COC: 'Centrocampista Offensivo',
    ED: 'Esterno Destro',
    ES: 'Esterno Sinistro',
    AD: 'Ala Destra',
    AS: 'Ala Sinistra',
    SP: 'Seconda Punta',
    PC: 'Punta Centrale',
  };

  constructor(private api: ApiService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.api.getAllGiocatori().subscribe(res => {
    this.giocatori = res.filter(g => g.ruoli && g.ruoli.includes(this.ruolo));
    });
  }

  seleziona(giocatore: any) {
    this.modalCtrl.dismiss(giocatore);
  }

  annulla() {
    this.modalCtrl.dismiss();
  }


  get giocatoriDisponibili() {
    return this.giocatori.filter(g => !this.giocatoriSelezionati.includes(g.id));
}
}

