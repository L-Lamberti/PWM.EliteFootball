import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-allenatori',
  templateUrl: './allenatori.page.html',
  styleUrls: ['./allenatori.page.scss'],
  standalone: true,
  imports: [ CommonModule, FormsModule, IonList, IonItem, IonLabel]
})
export class AllenatoriPage implements OnInit {
  allenatori: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTopAllenatori().subscribe(res => {
      console.log('Allenatori ricevuti:', res);
      this.allenatori = res;
    });
  }
}

