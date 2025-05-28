import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
//import { IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-giocatori-dettaglio',
  templateUrl: './giocatori-dettaglio.page.html',
  styleUrls: ['./giocatori-dettaglio.page.scss'],
  standalone: true,
  imports: [CommonModule, IonicModule]
})
export class GiocatoriDettaglioPage implements OnInit {
  giocatore: any;

  constructor(private route: ActivatedRoute, private api: ApiService) {}

  ngOnInit() {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.api.getGiocatoreById(+id).subscribe(res => {
      this.giocatore = res;
    });
  }
}

}
