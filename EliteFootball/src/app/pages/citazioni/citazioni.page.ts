import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';


@Component({
  selector: 'app-citazioni',
  templateUrl: './citazioni.page.html',
  styleUrls: ['./citazioni.page.scss'],
  standalone: true,
   imports: [ IonContent , CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class CitazioniPage implements OnInit {
  citazioni: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCitazioni().subscribe({
      next: (res) => {
        this.citazioni = res;
      },
      error: (err) => {
        console.error('Errore caricando citazioni', err);
      }
    });
  }
}
