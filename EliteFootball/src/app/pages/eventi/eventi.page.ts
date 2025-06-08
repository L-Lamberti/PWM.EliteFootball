import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonSpinner,IonList,IonItem,IonLabel } from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-eventi',
  templateUrl: './eventi.page.html',
  styleUrls: ['./eventi.page.scss'],
  standalone: true,
  imports: [ IonSpinner, IonList, IonItem,IonLabel, CommonModule, FormsModule]
})
export class EventiPage implements OnInit {
  eventi: any[] = [];
  caricamento = true;
  errore = false;

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getEventiLive().subscribe({
      next: (res: any) => {
        this.eventi = res.response; // API-Football restituisce i dati in response
        this.caricamento = false;
      },
      error: () => {
        this.errore = true;
        this.caricamento = false;
      }
    });
  }
}


