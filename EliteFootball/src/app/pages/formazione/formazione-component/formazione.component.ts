import { Component, OnInit , Input, Output, EventEmitter  } from '@angular/core';
import { ModalController, IonicModule, AlertController } from '@ionic/angular';
import { CommonModule} from '@angular/common';
import { SelezioneGiocatoreComponent } from 'src/app/components/selezione-giocatore/selezione-giocatore.component';
import { ActivatedRoute } from '@angular/router';
import { LayoutComponent } from "../../../layout/layout.component";
import { ApiService } from 'src/app/services/api.service'; // <-- IMPORTA ApiService!
import { FormsModule } from '@angular/forms'; // <-- IMPORTA FormsModule per ngModel
import { SelezioneAllenatoreComponent } from 'src/app/components/selezione-allenatore/selezione-allenatore/selezione-allenatore.component';

@Component({
  selector: 'app-formazione',
  templateUrl: './formazione.component.html',
  styleUrls: ['./formazione.component.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule, LayoutComponent, FormsModule],
})

export class FormazioneComponent implements OnInit {
  @Input() modulo: string = '';
  @Input() formazioneIniziale: any = null;
  @Output() close = new EventEmitter<void>();
  formazione: Record<string, any> = {};
  ruoli: string[] = [];
  ruoliIndicizzati: string[] = [];
  nomeFormazione: string = '';
  idFormazione: number | null = null;
  allenatore: any = null;

constructor(
    private modalCtrl: ModalController,
    private route: ActivatedRoute,
    private apiService: ApiService, // <-- AGGIUNGI QUESTO
    private alertCtrl: AlertController // <-- E QUESTO
  ) {}

  tuttiIGiocatori: any[] = [];
  tuttiGliAllenatori: any[] = [];

  ngOnInit() {
  // 1. Genera SEMPRE i ruoli e i ruoli indicizzati PRIMA di tutto!
  this.ruoli = this.generaModuli(this.modulo);
  this.ruoliIndicizzati = this.aggiungiIndiceRuoli(this.ruoli);

  this.apiService.getAllGiocatori().subscribe(giocatori => {
  this.tuttiIGiocatori = giocatori;
   this.apiService.getTopAllenatori().subscribe(allenatori => {
      this.tuttiGliAllenatori = allenatori;
  
  // 2. Se sei in modalità modifica, carica i dati della formazione
    if (this.formazioneIniziale) {
        this.nomeFormazione = this.formazioneIniziale.nome || '';
        this.idFormazione = this.formazioneIniziale.id;
        this.formazione = {};
        for (let i = 0; i < this.ruoliIndicizzati.length; i++) {
          const id = this.formazioneIniziale.giocatori[i];
          if (id) {
            // Trova il giocatore completo
            const giocatore = this.tuttiIGiocatori.find(g => g.id === id);
            if (giocatore) {
              this.formazione[this.ruoliIndicizzati[i]] = giocatore;
            }
          }
        }
        if (this.formazioneIniziale.allenatoreId) {
    this.allenatore = this.tuttiGliAllenatori.find(a => a.id === this.formazioneIniziale.allenatoreId) || null;
      }
      }
      });
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
      this.formazione[ruoloIndicizzato] = data;
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
 chiudi() {
    this.close.emit();
  }

async salvaFormazione() {
  const giocatori = this.ruoliIndicizzati.map(r => this.formazione[r]?.id || null);

  if (giocatori.some(id => id === null)) {
    const alert = await this.alertCtrl.create({
      header: 'Attenzione',
      message: 'Devi selezionare tutti i giocatori per ogni ruolo!',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  if (!this.allenatore) {
    const alert = await this.alertCtrl.create({
      header: 'Attenzione',
      message: 'Devi selezionare un allenatore!',
      buttons: ['OK']
    });
    await alert.present();
    return;
  }

  const formazionePayload = {
    nome: this.nomeFormazione,
    modulo: this.modulo,
    giocatori,
    allenatoreId: this.allenatore?.id
  };

  if (this.idFormazione) {
    // Aggiorna formazione esistente
    this.apiService.updateFormazione(this.idFormazione, formazionePayload).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Successo',
          message: 'Formazione salvata!',
          buttons: ['OK']
        });
        await alert.present();
        this.close.emit();
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Errore',
          message: err.error?.message || 'Errore durante il salvataggio',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  } else {
    // Crea nuova formazione
    this.apiService.saveFormazione(formazionePayload).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Successo',
          message: 'Formazione salvata!',
          buttons: ['OK']
        });
        await alert.present();
        this.close.emit();
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Errore',
          message: err.error?.message || 'Errore durante il salvataggio',
          buttons: ['OK']
        });
        await alert.present();
      }
    });
  }
}

async apriSelezioneAllenatore() {
  const modal = await this.modalCtrl.create({
    component: SelezioneAllenatoreComponent,
  });
  await modal.present();
  const { data } = await modal.onWillDismiss();
  if (data) {
    this.allenatore = data;
  }
}
}