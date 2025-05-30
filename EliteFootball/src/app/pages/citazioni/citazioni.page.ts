import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonItem, IonLabel, IonFooter, IonButtons, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-citazioni',
  templateUrl: './citazioni.page.html',
  styleUrls: ['./citazioni.page.scss'],
  standalone: true,
   imports: [IonButton, IonButtons, IonFooter, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, IonList, IonItem, IonLabel, RouterLink]
})
export class CitazioniPage implements OnInit {
  citazioni: any[] = [];

  constructor(private api: ApiService,private router: Router) {}

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
