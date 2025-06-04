import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { RouterOutlet } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [IonicModule, CommonModule, RouterOutlet]
})
export class LayoutComponent {
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