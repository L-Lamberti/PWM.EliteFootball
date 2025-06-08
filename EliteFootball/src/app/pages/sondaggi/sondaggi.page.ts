import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonBadge } from '@ionic/angular/standalone';

@Component({
  selector: 'app-sondaggi',
  templateUrl: './sondaggi.page.html',
  styleUrls: ['./sondaggi.page.scss'],
  standalone: true,
  imports: [IonBadge, IonItem, IonList, CommonModule, FormsModule]
})
export class SondaggiPage {
  sondaggio = {
    domanda: 'Chi vincerà la Serie A 2024/25?',
    opzioni: [
      { testo: 'Inter', voti: 0 },
      { testo: 'Juventus', voti: 0 },
      { testo: 'Milan', voti: 0 },
      { testo: 'Napoli', voti: 0 }
    ]
  };
  votato = false;

  vota(i: number) {
    if (!this.votato) {
      this.sondaggio.opzioni[i].voti++;
      this.votato = true;
    }
  }
}