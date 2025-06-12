import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-selezione-allenatore',
  standalone: true,
  imports: [CommonModule, IonicModule],
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