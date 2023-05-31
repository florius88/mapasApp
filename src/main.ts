import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';


/* Comporbamos si el navegador soporta la geolocalización */
if (!navigator.geolocation) {
  const mensaje = 'El Navegador no soporta la Geolocalización'
  alert(mensaje)
  throw new Error(mensaje)
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
