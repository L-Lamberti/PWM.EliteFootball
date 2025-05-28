/*import { Component } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  constructor() {}
}*/

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

//import { IonHeader, IonToolbar, IonTitle, IonContent} from '@ionic/angular/standalone';
import { ApiService } from 'src/app/services/api.service';

@Component({
  standalone : true,
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [ IonicModule , CommonModule]
})
/*export class HomePage implements OnInit {

  constructor(private api: ApiService) {}

  ngOnInit() {
    this.api.getWelcomeMessage().subscribe(res => {
      console.log(res);
    });
  }*/
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

