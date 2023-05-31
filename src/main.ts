import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import Mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"
Mapboxgl.accessToken = 'pk.eyJ1IjoiZmxvcml1cyIsImEiOiJjbGhxNDBhZGkwejhrM3FwZWNlMjV2ZzJwIn0.zJ8QZrKQ7BQbXTgBu8vasg'

import { AppModule } from './app/app.module';


/* Comporbamos si el navegador soporta la geolocalización */
if (!navigator.geolocation) {
  const mensaje = 'El Navegador no soporta la Geolocalización'
  alert(mensaje)
  throw new Error(mensaje)
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
