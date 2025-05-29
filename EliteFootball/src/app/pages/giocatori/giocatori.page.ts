
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar , IonList , IonItem , IonLabel} from '@ionic/angular/standalone';


@Component({
  selector: 'app-giocatori',
  templateUrl: './giocatori.page.html',
  styleUrls: ['./giocatori.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ,  IonList , IonItem , IonLabel , RouterLink]

})
export class GiocatoriPage implements OnInit {
  ruolo: string = '';           // codice per la query (es: 'PC')
  ruoloEsteso: string = '';     // nome da visualizzare (es: 'Punta Centrale')

  giocatori: any[] = [];
  

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

     this.ruolo = (params['ruolo'] || '').trim();
       console.log('Ruolo ricevuto:', this.ruolo);

      const nomiRuoli: Record<string, string> = {
      PC: 'Punta Centrale',
      AD: 'Ala Destra',
      AS: 'Ala Sinistra',
      CC: 'Centrocampista Centrale',
      CDC: 'Centrocampista Difensivo',
      COC: 'Centrocampista Offensivo',
      CD: 'Centrale Destro',
      CS: 'Centrale Sinistro',
      TD: 'Terzino Destro',
      TS: 'Terzino Sinistro',
      POR: 'Portiere',
      ES: 'Esterno Sinistro',
      ED: 'Esterno Destro',
      SP: 'Seconda Punta'
    };

    this.ruoloEsteso = nomiRuoli[this.ruolo] || this.ruolo;

      this.api.getTopGiocatori(this.ruolo).subscribe(res => {
        console.log('Giocatori ricevuti:', res);
        this.giocatori = res;
      });
    });
  }
  
}
