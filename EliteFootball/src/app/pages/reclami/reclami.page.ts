import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonItem, IonLabel, IonButton, IonContent, IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-reclami',
  templateUrl: './reclami.page.html',
  styleUrls: ['./reclami.page.scss'],
  standalone: true,
  imports: [IonTitle, IonToolbar, IonHeader, IonContent, IonButton, IonLabel, IonItem, CommonModule, FormsModule,ReactiveFormsModule]
})
export class ReclamiPage {
  reclamoForm: FormGroup;
  inviato = false;

  constructor(private fb: FormBuilder) {
    this.reclamoForm = this.fb.group({
      nome: [''],
      email: ['', [Validators.email]],
      messaggio: ['', [Validators.required, Validators.minLength(10)]]
    });
  }

  invia() {
    if (this.reclamoForm.valid) {
      // Qui puoi inviare i dati a un backend o salvarli
      this.inviato = true;
      this.reclamoForm.reset();
    }
  }
}
