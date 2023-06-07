import { Injectable } from '@angular/core';

import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined
  public isLoadingPlaces: boolean = false
  public places: Feature[] = []

  get isUserLocationReady(): boolean {
    // Queremos que nos lo devuelva cuando tenga un valor,
    // por eso se usa la doble negación
    return !!this.userLocation
  }

  /**
   * Constructor
   */
  constructor(private placesApi: PlacesApiClient) {
    this.getUserLocation()
  }

  /**
   *
   * @returns la posición del usuario
   */
  public async getUserLocation(): Promise<[number, number]> {

    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          this.userLocation = [coords.longitude, coords.latitude]
          resolve(this.userLocation)
        },
        (error) => {
          alert('No se pudo obtener la geolocalización')
          console.log(error);
          reject()
        }
      )
    })
  }

  getPlacesByQuery(query: string = '') {
    // todo: evaluar cuando el query es nulo
    // -3.702839222986114,40.41591218630202

    if (!this.userLocation) throw Error('No hay userLocation')

    this.isLoadingPlaces = true

    this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params: { proximity: this.userLocation.join(',') }
    })
      .subscribe(resp => {
        this.isLoadingPlaces = false
        this.places = resp.features
      })
  }

}
