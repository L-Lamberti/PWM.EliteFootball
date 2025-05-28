import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar ,  IonList , IonItem , IonLabel} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-allenatori',
  templateUrl: './allenatori.page.html',
  styleUrls: ['./allenatori.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ,  IonList , IonItem , IonLabel]
})
export class AllenatoriPage implements OnInit {

  allenatori: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getTopAllenatori().subscribe(res => {
      this.allenatori = res;
    });
  }

}
