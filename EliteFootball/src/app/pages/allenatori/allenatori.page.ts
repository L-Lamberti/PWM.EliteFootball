import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonList, IonItem, IonLabel } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';
import { LayoutComponent } from "../../layout/layout.component";

@Component({
  selector: 'app-allenatori',
  templateUrl: './allenatori.page.html',
  styleUrls: ['./allenatori.page.scss'],
  standalone: true,
  imports: [ IonContent, CommonModule, FormsModule, IonList, IonItem, IonLabel, LayoutComponent]
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

