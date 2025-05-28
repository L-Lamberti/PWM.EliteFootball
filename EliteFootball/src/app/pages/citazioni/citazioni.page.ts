import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar  ,  IonList , IonItem , IonLabel , IonThumbnail} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';
//import { IonThumbnail } from '@ionic/angular';

@Component({
  selector: 'app-citazioni',
  templateUrl: './citazioni.page.html',
  styleUrls: ['./citazioni.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule ,  IonList , IonItem , IonLabel  , IonThumbnail]
})
export class CitazioniPage implements OnInit {

  citazioni: any[] = [];

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getCitazioni().subscribe(res => {
      this.citazioni = res;
    });
  }

}
