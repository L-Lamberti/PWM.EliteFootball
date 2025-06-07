import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-register',
  templateUrl: 'register.page.html',
  styleUrls: ['register.page.scss'],
  standalone: true,
  imports: [IonicModule, FormsModule],
})
export class RegisterPage {
  nome = '';
  email = '';
  password = '';
  confirmPassword = '';

  constructor(private router: Router, private alertCtrl: AlertController) {}

  async onRegister() {
    if (this.password !== this.confirmPassword) {
      const alert = await this.alertCtrl.create({
        header: 'Errore',
        message: 'Le password non coincidono',
        buttons: ['OK'],
      });
      await alert.present();
      return;
    }

    // Qui colleghi il backend, oppure simuli la registrazione
    // Esempio: mostra alert di successo e vai al login
    const alert = await this.alertCtrl.create({
      header: 'Successo',
      message: 'Registrazione completata!',
      buttons: ['OK'],
    });
    await alert.present();
    this.router.navigate(['/login']);
  }
}