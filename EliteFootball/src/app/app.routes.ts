import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage)
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
  {
    path: 'formazione',
    loadComponent: () => import('./pages/formazione/formazione.page').then( m => m.FormazionePage)
  },
];
