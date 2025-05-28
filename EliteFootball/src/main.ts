import { bootstrapApplication } from '@angular/platform-browser';
import { RouteReuseStrategy, provideRouter, withPreloading, PreloadAllModules } from '@angular/router';
import { IonicRouteStrategy, provideIonicAngular } from '@ionic/angular/standalone';
import { routes } from './app/app.routes';
import { AppComponent } from './app/app.component';
import { provideHttpClient } from '@angular/common/http';
import { defineCustomElements } from 'ionicons/dist/loader';
import { addIcons } from 'ionicons';
import { closeCircleOutline } from 'ionicons/icons';


defineCustomElements(window);
addIcons({
  'close-circle-outline': closeCircleOutline
});

bootstrapApplication(AppComponent, {
  providers: [
    provideIonicAngular(),
    provideRouter(routes),
    provideHttpClient(),
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ]
});
