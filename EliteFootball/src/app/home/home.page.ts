import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonicModule, CommonModule]
})
export class HomePage {
  constructor(private router: Router) {}

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

  openFormazione(modulo: string) {
    this.router.navigate(['/formazione'], { queryParams: { modulo } });
  }
}