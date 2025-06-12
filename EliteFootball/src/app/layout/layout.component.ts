import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, AlertController } from '@ionic/angular';
import { RouterOutlet } from '@angular/router'; 

@Component({
  standalone: true,
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  imports: [IonicModule, CommonModule, RouterOutlet]
})
export class LayoutComponent implements OnInit, OnDestroy {
  isLoggedIn = false;
  private alertShown = false; // Previene doppio alert cross-tab

   // Salva i listener per poterli rimuovere
  private storageListener = (event: StorageEvent) => this.handleStorageChange(event);
  private authChangeListener = () => this.checkLogin();


  constructor(private router: Router, private alertCtrl: AlertController) {}


  ngOnInit() {
    this.checkLogin();
    window.addEventListener('storage', this.storageListener);
    window.addEventListener('authChange', this.authChangeListener);
  }

  ngOnDestroy() {
    window.removeEventListener('storage', this.storageListener);
    window.removeEventListener('authChange', this.authChangeListener);
  }

  checkLogin() {
    this.isLoggedIn = !!localStorage.getItem('token');
  }

  onLoginLogoutClick() {
    if (this.isLoggedIn) {
      this.logout();
    } else {
      this.vaiAlLogin();
    }
  }

  // Logout nella tab corrente
  async logout() {
    localStorage.removeItem('token');
    this.checkLogin();
    // Simula un evento storage per aggiornare anche questa tab (e altre)
    window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: null }));
    window.dispatchEvent(new Event('authChange')); // <-- AGGIUNGI QUESTO!
    this.router.navigate(['/']);
    await this.showLogoutAlert();
  }

  // Logout cross-tab
  async handleStorageChange(event: StorageEvent) {
    if (event.key === 'token' && !event.newValue && this.isLoggedIn) {
      this.isLoggedIn = false;
      this.router.navigate(['/']);
      if (!this.alertShown) {
        await this.showLogoutAlert();
      }
    }
  }

  async showLogoutAlert() {
    this.alertShown = true;
    const alert = await this.alertCtrl.create({
      header: 'Logout',
      message: 'Logout effettuato con successo!',
      buttons: ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss();
    this.alertShown = false;
  }


  removeFocus(event: MouseEvent) {
    (event.target as HTMLElement).blur();
  }

  // Navigazioni
  vaiAllaHome() {
    this.router.navigate(['/']);
  }
  vaiAllaFormazione() {
    this.router.navigate(['/formazioni']);
  }
  vaiATopGiocatori() {
    this.router.navigate(['/giocatori']);
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
  vaiAlTorneo() {
    this.router.navigate(['/torneo']);
  }
  vaiAQuiz() {
    this.router.navigate(['/quiz']);
  }
  vaiAReclami() {
    this.router.navigate(['/reclami']);
  }
}