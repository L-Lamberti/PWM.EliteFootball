import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonButton, IonFooter, IonButtons } from '@ionic/angular/standalone';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allenatori',
  templateUrl: './allenatori.page.html',
  styleUrls: ['./allenatori.page.scss'],
  standalone: true,
  imports: [IonButtons, IonFooter, IonButton, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel,RouterLink]
})
export class AllenatoriPage implements OnInit {
  allenatori: any[] = [];

  constructor(private api: ApiService,private router: Router) {}

  ngOnInit() {
    this.api.getTopAllenatori().subscribe(res => {
      console.log('Allenatori ricevuti:', res);
      this.allenatori = res;
    });
  }
  vaiAllaHome() {
    this.router.navigate(['/home']);
  }

  vaiATopGiocatori() {
    this.router.navigate(['/giocatori'], { queryParams: { ruolo: 'PC' } });
  }

  vaiAAllenatori() {
    this.router.navigate(['/allenatori']);
  }

  vaiACitazioni() {
    this.router.navigate(['/citazioni']);
  }
  vaiAlLogin() {
    this.router.navigate(['/login']);
  }

  vaiAllaRegistrazione() {
    this.router.navigate(['/register']);
  }
}

