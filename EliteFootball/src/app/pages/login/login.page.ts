import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from 'src/app/services/api.service';
import { IonTitle, IonToolbar,IonHeader, IonButton, IonLabel, IonContent, IonItem } from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  standalone: true,
  imports: [ FormsModule, IonTitle, IonItem, IonToolbar, IonHeader, IonButton, IonLabel,IonContent],
})
export class LoginPage {
  email = '';
  password = '';

  constructor(
    private router: Router,
    private alertCtrl: AlertController,
    private apiService: ApiService
  ) {}

  isEmailValid(email: string): boolean {
    // Regex per email valida standard
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async onLogin() {
    if (!this.isEmailValid(this.email)) {
      const alert = await this.alertCtrl.create({
        header: 'Errore',
        message: 'Inserisci un indirizzo email valido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.apiService.login(this.email, this.password).subscribe({
      next: async (res) => {
      localStorage.setItem('token', res.token);
      if (res.role) {
        localStorage.setItem('role', res.role); // <--- SALVA IL RUOLO!
      } else {
        localStorage.removeItem('role'); // In caso non venga passato
      }
      // Notifica tutte le tab E QUESTA con evento custom
      window.dispatchEvent(new StorageEvent('storage', { key: 'token', newValue: res.token }));
      window.dispatchEvent(new Event('authChange')); 
      
      const alert = await this.alertCtrl.create({
        header: 'Successo',
        message: 'Login effettuato!',
        buttons: ['OK'],
      });
      await alert.present();
      this.router.navigate(['/']);
      },
        error: async (err) => {
          const alert = await this.alertCtrl.create({
            header: 'Errore',
            message: err.error?.message || 'Login fallito',
            buttons: ['OK'],
          });
          await alert.present();
        }
    });
  }
  vaiAllaRegistrazione() {
    this.router.navigate(['/register']);
  }
}