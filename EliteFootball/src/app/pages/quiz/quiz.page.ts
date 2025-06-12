import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButton, IonItem, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonList, IonButton, IonItem, CommonModule, FormsModule]
})
export class QuizPage implements OnInit {
  domande: any[] = [];
  indice = 0;
  rispostaSelezionata: number | null = null;
  mostraRisposta = false;
  punteggio = 0;
  completato = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getQuiz().subscribe({
      next: data => {
        this.domande = data;
      },
      error: err => {
        console.error('❌ Errore durante il caricamento del quiz:', err);
      }
    });
  }

 selezionaRisposta(i: number) {
  if (!this.mostraRisposta) {
    this.rispostaSelezionata = i;

    if (i === this.domande[this.indice].corretta) {
      this.punteggio++;
    }

    this.mostraRisposta = true;
  }
}


  confermaRisposta() {
    if (this.rispostaSelezionata === this.domande[this.indice].corretta) {
      this.punteggio++;
    }
    this.mostraRisposta = true;
  }

  avanti() {
    this.indice++;
    this.rispostaSelezionata = null;
    this.mostraRisposta = false;

    if (this.indice >= this.domande.length) {
      this.completato = true;
    }
  }

  getFeedback(punteggio: number) {
  const feedback = [
    { descrizione: '🙈 Hai bisogno di ripassare! Allenati di più.', img: 'assets/img/zero.webp' },
    { descrizione: '⚽ Non è andata bene. Ma c’è margine di miglioramento!', img: 'assets/img/uno.jpg' },
    { descrizione: '🔄 Qualche conoscenza ce l’hai, ma serve costanza.', img: 'assets/img/due.jpg' },
    { descrizione: '💪 Te la cavi! Ma si può fare di meglio.', img: 'assets/img/tre.jpg' },
    { descrizione: '🔥 Ottimo lavoro! Quasi perfetto.', img: 'assets/img/quattro.jpg' },
    { descrizione: '🏆 Sei un vero Mister! Conosci tutto!', img: 'assets/img/cinque.jpg' }
  ];
  return feedback[punteggio] || feedback[0];
}

restartQuiz() {
  this.indice = 0;
  this.punteggio = 0;
  this.completato = false;
  this.rispostaSelezionata = null;

  this.api.getQuiz().subscribe({
    next: data => {
      this.domande = data; // assegna le nuove domande ricevute
    },
    error: err => {
      console.error('❌ Errore durante il ricaricamento del quiz:', err);
    }
  });
}


}
