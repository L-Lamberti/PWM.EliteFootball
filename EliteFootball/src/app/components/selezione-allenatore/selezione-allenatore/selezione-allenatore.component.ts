import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';
import {IonButton,IonHeader,IonItem,IonTitle,IonButtons,IonContent,IonToolbar,IonList,IonLabel} from '@ionic/angular/standalone';

@Component({
  selector: 'app-selezione-allenatore',
  standalone: true,
  imports: [CommonModule,IonButton,IonHeader,IonItem,IonTitle,IonButtons,IonContent,IonToolbar,IonList,IonLabel],
  templateUrl: './selezione-allenatore.component.html',
  styleUrls: ['./selezione-allenatore.component.scss'],
})
export class SelezioneAllenatoreComponent implements OnInit {
  allenatori: any[] = [];

  constructor(private api: ApiService, private modalCtrl: ModalController) {}

  ngOnInit() {
    this.api.getTopAllenatori().subscribe(res => {
      this.allenatori = res;
    });
  }

  seleziona(allenatore: any) {
    this.modalCtrl.dismiss(allenatore);
  }

  annulla() {
    this.modalCtrl.dismiss();
  }
}