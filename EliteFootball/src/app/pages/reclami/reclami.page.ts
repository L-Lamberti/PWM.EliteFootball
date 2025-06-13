import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonItem, IonLabel, IonButton, IonContent, IonHeader, IonToolbar, IonTitle, IonInput, IonTextarea } from '@ionic/angular/standalone';import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-reclami',
  templateUrl: './reclami.page.html',
  styleUrls: ['./reclami.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonContent, IonButton, IonLabel, IonItem, CommonModule, FormsModule,ReactiveFormsModule, IonInput, IonTextarea]
})

export class ReclamiPage {
  reclamoForm: FormGroup;
  inviato = false;

  constructor(private fb: FormBuilder, private apiService: ApiService) {
    this.reclamoForm = this.fb.group({
      nome: [''],
      email: ['', [Validators.email]],
      messaggio: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  invia() {
    if (this.reclamoForm.valid) {
      this.apiService.sendFeedback(this.reclamoForm.value).subscribe({
        next: () => {
          this.inviato = true;
          this.reclamoForm.reset();
        },
        error: () => {
          alert('Errore nell\'invio del feedback. Riprova.');
        }
      });
    }
  }
}