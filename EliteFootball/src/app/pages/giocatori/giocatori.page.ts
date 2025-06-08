import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonList , IonItem , IonLabel, IonButton, IonGrid, IonRow, IonCol } from '@ionic/angular/standalone';



@Component({
  selector: 'app-giocatori',
  templateUrl: './giocatori.page.html',
  styleUrls: ['./giocatori.page.scss'],
  standalone: true,
  imports: [IonCol, IonRow, IonGrid, IonButton, CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class GiocatoriPage implements OnInit {
  ruoli = [{ codice: 'AS', nome: 'Ala Sinistra' },
    { codice: 'PC', nome: 'Punta Centrale' },
    { codice: 'SP', nome: 'Seconda Punta' },
    { codice: 'AD', nome: 'Ala Destra' },
    { codice: 'ES', nome: 'Esterno Sinistro' },
    { codice: 'COC', nome: 'Centrocampista Offensivo' },
    { codice: 'CC', nome: 'Centrocampista Centrale' },
    { codice: 'ED', nome: 'Esterno Destro' },
    { codice: 'TS', nome: 'Terzino Sinistro' },
    { codice: 'CDC', nome: 'Centrocampista Difensivo' },
    { codice: 'DC', nome: 'Difensore Centrale' },
    { codice: 'TD', nome: 'Terzino Destro' },
    { codice: 'POR', nome: 'Portiere' },  
  ];
  ruoloSelezionato: string = '';           // codice per la query (es: 'PC')
  ruoloEsteso: string = '';     // nome da visualizzare (es: 'Punta Centrale')
  giocatori: any[] = [];
  

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {}

      selezionaRuolo(ruolo: any) {
      this.ruoloSelezionato = ruolo.codice;
      this.ruoloEsteso =  ruolo.nome;
      this.api.getTopGiocatori(this.ruoloSelezionato).subscribe(res => {
        console.log('Giocatori ricevuti:', res);
        this.giocatori = res;
      });
  }
}

