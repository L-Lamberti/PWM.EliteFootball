import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
   {
    path: '',
    component: LayoutComponent,
    children: [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then((m) => m.HomePage)
  },
  {
    path: 'giocatori',
    loadComponent: () => import('./pages/giocatori/giocatori.page').then( m => m.GiocatoriPage)
  },
  {
    path: 'allenatori',
    loadComponent: () => import('./pages/allenatori/allenatori.page').then( m => m.AllenatoriPage)
  },
  {
    path: 'citazioni',
    loadComponent: () => import('./pages/citazioni/citazioni.page').then( m => m.CitazioniPage)
  },
  {
    path: 'giocatori/:id',
    loadComponent: () => import('./pages/giocatori-dettaglio/giocatori-dettaglio.page').then( m => m.GiocatoriDettaglioPage)
  },
    ]
  }
];
