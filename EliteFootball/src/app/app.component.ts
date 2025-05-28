import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Component } from '@angular/core';



@Component({
  standalone : true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [IonicModule, RouterModule, CommonModule],
})
export class AppComponent {
  constructor() {}
}


