
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone : true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonicModule , CommonModule]
})

 export class HomePage {
  

  constructor(private router: Router) {}
  

  vaiAGiocatori(ruolo: string) {
    this.router.navigate(['/giocatori'], { queryParams: { ruolo } });
  }

  openFormazione(modulo: string) {
    // Per ora puoi mostrare un alert
    //alert(`Hai selezionato la formazione ${formazione}`);
    this.router.navigate(['/formazione'], { queryParams: { modulo } });
    
  }
}

