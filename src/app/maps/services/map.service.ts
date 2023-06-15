import { Injectable } from '@angular/core';
import { LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root'
})
export class MapService {

  private map?: Map
  private markers: Marker[] = []

  get isMapReady() {
    return !!this.map
  }

  setMap(map: Map) {
    this.map = map
  }

  flyTo(coords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no está inicializado')

    this.map?.flyTo({
      zoom: 14,
      center: coords,
    })
  }

  createMarkersFromPlaces(places: Feature[], userLocation: [number, number]) {

    if (!this.map) throw Error('Mapa no inicializado')

    // Nos aseguramos de borrar los markadores existentes
    this.markers.forEach(marker => marker.remove())

    const newMarkers = []
    for (const place of places) {
      const [lng, lat] = place.center
      const popup = new Popup()
        .setHTML(`
      <h6>${place.text}</h6>
      <span>${place.place_name}</span>
      `)

      const newMarker = new Marker()
        .setLngLat([lng, lat])
        .setPopup(popup)
        .addTo(this.map)

      newMarkers.push(newMarker)
    }

    // Volvemos a añadir los marcadores al mapa
    this.markers = newMarkers

    // Vamos a ajustar el mapa para mostrar todos los marcadores encontrados
    if (places.length === 0) return

    // Limites del mapa
    const bounds = new LngLatBounds()
    // Añadimos los marcadores
    newMarkers.forEach(marker => bounds.extend(marker.getLngLat()))

    // Añadimos la posición del usuario
    bounds.extend(userLocation)

    this.map.fitBounds(bounds, { padding: 200 })

  }

}
