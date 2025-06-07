import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
   {
    path: '',
    component: LayoutComponent,
    children: [
  {
    path: 'formazioni',
    loadComponent: () => import('./pages/formazione/formazione.page').then((m) => m.FormazionePage)
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
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'torneo',
    loadComponent: () => import('./pages/torneo/torneo.page').then( m => m.TorneoPage)
  },
    ]
  },  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },

  
];
