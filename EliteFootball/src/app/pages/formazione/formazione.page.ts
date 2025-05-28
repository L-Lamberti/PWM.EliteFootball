import { Router } from '@angular/router';
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

  constructor(private modalCtrl: ModalController, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.modulo = params['modulo'] || '4-3-3';
      this.ruoli = this.generaRuoli(this.modulo);
      console.log('Modulo selezionato:', this.modulo);
      console.log('Ruoli generati:', this.ruoli);
    });
  }

   generaRuoli(modulo: string): string[] {
    const moduli: Record<string, string[]> = {
      '4-3-3': ['AS', 'PC', 'AD', 'CC', 'COC', 'CDC', 'TS', 'DC', 'DC', 'TD', 'POR'],
      '3-5-2': ['PC', 'SP', 'ES', 'CC', 'COC','CDC', 'ED', 'DC', 'DC', 'DC', 'POR'],
      '4-4-2': ['PC', 'SP', 'ES', 'CC', 'CC', 'ED', 'TS', 'DC', 'DC', 'TD', 'POR'],
      '3-4-1-2': ['PC', 'SP', 'COC', 'ES', 'CC', 'CDC', 'ED', 'DC', 'DC', 'DC', 'POR']
    };

    return moduli[modulo] || [];
  }


  async apriSelezione(ruolo: string) {
    const modal = await this.modalCtrl.create({
      component: SelezioneGiocatoreComponent,
      componentProps: { ruolo },
    });

    await modal.present();

    const { data } = await modal.onDidDismiss();
    if (data) {
      this.formazione[ruolo] = data;
    }
  }

  get classeModulo(): string {
  return 'modulo-' + this.modulo.replace(/-/g, '');
}



  rimuoviDiretto(event: Event, ruolo: string) {
  event.stopPropagation();
  this.formazione[ruolo] = undefined;
}


}
