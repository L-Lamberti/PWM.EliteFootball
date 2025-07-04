import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { IonButton,IonCard, IonCardContent } from '@ionic/angular/standalone';


interface Giocatore {
  id: number;
  nome: string;
  cognome: string;
  eta: number;
  descrizione: string;
  voto: number;
  foto: string;
}

@Component({
  selector: 'app-h2h',
  templateUrl: './h2h.page.html',
  styleUrls: ['./h2h.page.scss'],
  standalone: true,
  imports: [ CommonModule, IonButton, IonCard, IonCardContent ]
})
export class H2HPage implements OnInit {
  fasi = [4, 8, 16, 32, 64];
  faseScelta: number | null = null;
  giocatori: Giocatore[] = [];
  giocatoriSelezionati: Giocatore[] = [];
  bracket: Giocatore[][] = [];
  turno = 0;
  vincitoriTurno: Giocatore[] = [];
  vincitoreFinale: Giocatore | null = null;
  currentSfidaIndex = 0;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAllGiocatori().subscribe({
      next: (res) => {
        this.giocatori = res;
      },
      error: (err) => {
        console.error('Errore caricando giocatori', err);
      }
    });
  }

 scegliFase(fase: number) {
  this.faseScelta = fase;
  // Mischia i giocatori e prendi i primi N
  const shuffled = [...this.giocatori].sort(() => Math.random() - 0.5);
  this.giocatoriSelezionati = shuffled.slice(0, fase);
  this.bracket = [];
  this.turno = 0;
  this.vincitoriTurno = [];
  this.vincitoreFinale = null;
  this.currentSfidaIndex = 0;
  this.avviah2h();
}

  avviah2h() {
  const shuffled = [...this.giocatoriSelezionati].sort(() => Math.random() - 0.5);
  this.bracket = [];
  for (let i = 0; i < shuffled.length; i += 2) {
    this.bracket.push([shuffled[i], shuffled[i + 1]]);
  }
  this.turno = 1;
  this.vincitoriTurno = [];
  this.vincitoreFinale = null;
  this.currentSfidaIndex = 0;
}
 
scegliVincitore(sfida: Giocatore[], vincitore: Giocatore) {
  this.vincitoriTurno.push(vincitore);
  this.currentSfidaIndex++;
  if (this.currentSfidaIndex >= this.bracket.length) {
    if (this.vincitoriTurno.length === 1) {
      this.vincitoreFinale = this.vincitoriTurno[0];
      this.turno = 0;
      this.bracket = [];
    } else {
      const nextBracket: Giocatore[][] = [];
      const shuffled = [...this.vincitoriTurno];
      for (let i = 0; i < shuffled.length; i += 2) {
        nextBracket.push([shuffled[i], shuffled[i + 1]]);
  }
      this.bracket = nextBracket;
      this.vincitoriTurno = [];
      this.turno++;
      this.currentSfidaIndex = 0;
    }
  }
}

  reseth2h() {
    this.faseScelta = null;
    this.giocatoriSelezionati = [];
    this.bracket = [];
    this.turno = 0;
    this.vincitoriTurno = [];
    this.vincitoreFinale = null;
  }
}