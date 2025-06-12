import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-feedback-admin',
  templateUrl: './feedback-admin.page.html',
  styleUrls: ['./feedback-admin.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class FeedbackAdminPage implements OnInit {
  feedbackList: any[] = [];
  loading = true;
  errorMsg = '';

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getAllFeedback().subscribe({
      next: (data) => {
        this.feedbackList = data;
        this.loading = false;
      },
      error: (error) => {
        this.errorMsg = 'Errore nel caricamento dei feedback.';
        this.loading = false;
      }
    });
  }
}