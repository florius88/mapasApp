import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Feature, PlacesResponse } from '../interfaces/places';


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
  constructor(private http: HttpClient) {
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

    this.isLoadingPlaces = true

    this.http.get<PlacesResponse>(`https://api.mapbox.com/geocoding/v5/mapbox.places/${query}.json?limit=5&proximity=-3.702839222986114,40.41591218630202&language=es&access_token=pk.eyJ1IjoiZmxvcml1cyIsImEiOiJjbGhxM3AxNXYxeGsxM2xvZDg5aXMxZmp1In0.AJrUVLjB4yb7GcRhzWUx6g`)
      .subscribe(resp => {
        this.isLoadingPlaces = false
        this.places = resp.features
      })
  }

}
