import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { FormazioneComponent } from './formazione-component/formazione.component';
import { ApiService } from 'src/app/services/api.service';
import {IonButton,IonList,IonLabel,IonItem} from '@ionic/angular/standalone';


@Component({
  standalone: true,
  selector: 'app-formazioni',
  templateUrl: 'formazione.page.html',
  styleUrls: ['formazione.page.scss'],
  imports: [CommonModule, FormazioneComponent,IonButton,IonList,IonLabel,IonItem]
})

export class FormazionePage implements OnInit {
  mostraFormazione = false;
  moduloSelezionato: string | null = null;
  formazioniSalvate: any[] = [];
  formazioneDaModificare: any = null;
  tuttiIGiocatori: any[] = [];
  tuttiGliAllenatori: any[] = [];

  constructor(private apiService: ApiService, private alertCtrl: AlertController) {}

  ngOnInit() {
    this.apiService.getAllGiocatori().subscribe(giocatori => {
      this.tuttiIGiocatori = giocatori;
       this.apiService.getTopAllenatori().subscribe(allenatori => {
      this.tuttiGliAllenatori = allenatori;
    this.caricaFormazioni();
  });
});
  }
   getCognomeById(id: number) {
    const g = this.tuttiIGiocatori.find(x => x.id === id);
    return g ? g.cognome : '';
  }
   getAllenatoreById(id: number) {
    const a = this.tuttiGliAllenatori.find(x => x.id === id);
    return a ? `${a.nome} ${a.cognome}` : '';
   }

  caricaFormazioni() {
    this.apiService.getFormazioni().subscribe(res => {
      this.formazioniSalvate = res as any[];
    });
  }

  openFormazione(modulo: string, formazione?: any) {
    this.moduloSelezionato = modulo;
    this.formazioneDaModificare = formazione || null; 
    this.mostraFormazione = true;
  }

  chiudiFormazione() {
    this.mostraFormazione = false;
    this.moduloSelezionato = null;
    // Dopo la chiusura può essere utile ricaricare la lista se hai appena salvato una formazione
    this.caricaFormazioni();
  }

  async eliminaFormazione(id: number) {
    const alert = await this.alertCtrl.create({
      header: 'Conferma',
      message: 'Vuoi davvero eliminare questa formazione?',
      buttons: [
        { text: 'Annulla', role: 'cancel' },
        {
          text: 'Elimina',
          handler: () => {
            this.apiService.deleteFormazione(id).subscribe(() => {
              this.caricaFormazioni();
            });
          }
        }
      ]
    });
    await alert.present();
  }
}