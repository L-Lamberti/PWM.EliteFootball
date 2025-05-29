import { ModalController, IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { SelezioneGiocatoreComponent } from 'src/app/components/selezione-giocatore/selezione-giocatore.component';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-formazione',
  templateUrl: './formazione.page.html',
  styleUrls: ['./formazione.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule],
})

export class FormazionePage implements OnInit {

  formazione: Record<string, any> = {};
  modulo: string = '';
  ruoli: string[] = [];
  ruoliIndicizzati: string[] = [];

  constructor(private modalCtrl: ModalController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modulo = params['modulo'] || '4-3-3';
      this.ruoli = this.generaModuli(this.modulo);
      this.ruoliIndicizzati = this.aggiungiIndiceRuoli(this.ruoli);
    });
  }

  generaModuli(modulo: string): string[] {
    const moduli: Record<string, string[]> = {
      '4-3-3': ['AS', 'PC', 'AD', 'CC', 'COC', 'CC', 'TS', 'DC', 'DC', 'TD', 'POR'],
      '3-5-2': ['PC', 'SP', 'ES', 'CC', 'CDC', 'CC', 'ED', 'DC', 'DC', 'DC', 'POR'],
      '4-4-2': ['PC', 'SP', 'ES', 'CC', 'CC', 'ED', 'TS', 'DC', 'DC', 'TD', 'POR'],
      '3-4-1-2': ['PC', 'SP', 'COC', 'ES', 'CC', 'CC', 'ED', 'DC', 'DC', 'DC', 'POR']
    };
    return moduli[modulo] || [];
  }

  aggiungiIndiceRuoli(ruoli: string[]): string[] {
    const counter: Record<string, number> = {};
    return ruoli.map(ruolo => {
      const index = counter[ruolo] ?? 0;
      counter[ruolo] = index + 1;
      return `${ruolo}-${index}`;
    });
  }

  async apriSelezione(ruoloIndicizzato: string) {
    const ruolo = ruoloIndicizzato.split('-')[0];
    


    const modal = await this.modalCtrl.create({
      component: SelezioneGiocatoreComponent,
      componentProps: { ruolo,
        giocatoriSelezionati : Object.values(this.formazione)
        .filter(g => g) // esclude slot vuoti
        .map(g => g.id)
       }, // prende solo gli ID },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      if (this.giocatoreGiaPresente(data)) {
        alert('Questo giocatore è già stato selezionato.');
        return;
      }
      this.formazione[ruolo] = data;
    }
  }

  get classeModulo(): string {
    return 'modulo-' + this.modulo.replace(/-/g, '');
  }

  rimuoviDiretto(event: Event, ruoloIndicizzato: string) {
    event.stopPropagation();
    this.formazione[ruoloIndicizzato] = undefined;
  }

  giocatoreGiaPresente(nuovoGiocatore: any): boolean {
    return Object.values(this.formazione).some(g =>
      g && g.id === nuovoGiocatore.id
    );
  }
}

