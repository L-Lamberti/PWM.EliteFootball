import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonItem, IonButton, IonList } from '@ionic/angular/standalone';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.page.html',
  styleUrls: ['./quiz.page.scss'],
  standalone: true,
  imports: [IonList, IonButton, IonItem, CommonModule, FormsModule]
})
export class QuizPage {
 domande = [
    {
      testo: 'Chi ha vinto più Palloni d\'Oro?',
      risposte: ['Cristiano Ronaldo', 'Lionel Messi', 'Michel Platini', 'Johan Cruijff'],
      corretta: 1
      },
    // ...altre domande...
  ];
  indice = 0;
  rispostaSelezionata: number | null = null;
  punteggio = 0;
  completato = false;

  selezionaRisposta(i: number) {
    this.rispostaSelezionata = i;
  }

  avanti() {
    if (this.rispostaSelezionata === this.domande[this.indice].corretta) {
      this.punteggio++;
    }
    this.indice++;
    this.rispostaSelezionata = null;
    if (this.indice >= this.domande.length) {
      this.completato = true;
    }
  }
}
