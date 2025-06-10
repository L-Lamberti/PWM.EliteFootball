import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
   {
    path: '',
    component: LayoutComponent,
    children: [
        {
        path: '',
        loadComponent: () => import('./pages/home/home.page').then(m => m.HomePage)
      },
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
         path: 'login', loadComponent: () => import('./pages/login/login.page').then(m => m.LoginPage) },
      {
        path: 'register',
        loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
      },
      {
        path: 'torneo',
        loadComponent: () => import('./pages/h2h/h2h.page').then( m => m.H2HPage)
      },
      {
        path: 'eventi',
        loadComponent: () => import('./pages/eventi/eventi.page').then( m => m.EventiPage)
      },
      {
        path: 'quiz',
        loadComponent: () => import('./pages/quiz/quiz.page').then( m => m.QuizPage)
      },
      {
        path: 'sondaggi',
        loadComponent: () => import('./pages/sondaggi/sondaggi.page').then( m => m.SondaggiPage)
      },
      {
        path: 'reclami',
        loadComponent: () => import('./pages/reclami/reclami.page').then( m => m.ReclamiPage)
      },
    ]
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage)
  },
    ]
  },
  
  
];
