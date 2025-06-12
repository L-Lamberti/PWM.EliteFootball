import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { IonTitle, IonToolbar,IonHeader, IonButton, IonLabel, IonContent, IonItem, IonInput } from '@ionic/angular/standalone';

@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
    imports: [FormsModule, IonItem, IonLabel, IonButton, IonContent, IonTitle, IonHeader, IonToolbar, IonInput],
  
})
export class RegisterPage {
  
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private alertCtrl: AlertController , private apiService: ApiService) {}

  isPasswordValid(password: string): boolean {
    // Min 8 caratteri, almeno un numero, un carattere speciale, una maiuscola
    const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
  }

  isEmailValid(email: string): boolean {
    // Regex per email valida standard
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  async onRegister() {
    if (!this.isEmailValid(this.email)) {
      const alert = await this.alertCtrl.create({
        header: 'Errore',
        message: 'Inserisci un indirizzo email valido.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }
    
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Errore',
        message: 'Le password non coincidono',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    if (!this.isPasswordValid(this.password)) {
      const alert = await this.alertCtrl.create({
        header: 'Errore',
        message: 'La password deve essere lunga almeno 8 caratteri, contenere almeno una maiuscola, un numero e un carattere speciale.',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    this.apiService.register(this.email, this.password).subscribe({
      next: async (res) => {
        const alert = await this.alertCtrl.create({
          header: 'Successo',
          message: 'Registrazione completata!',
          buttons: ['OK'],
        });
        await alert.present();
        this.router.navigate(['/login']);
      },
      error: async (err) => {
        const alert = await this.alertCtrl.create({
          header: 'Errore',
          message: err.error?.message || 'Registrazione fallita',
          buttons: ['OK'],
        });
        await alert.present();
      }
    });
  }
}