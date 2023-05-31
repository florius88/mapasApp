import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PlacesService {

  public userLocation: [number, number] | undefined

  get isUserLocationReady(): boolean {
    // Queremos que nos lo devuelva cuando tenga un valor,
    // por eso se usa la doble negación
    return !!this.userLocation
  }

  /**
   * Constructor
   */
  constructor() {
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

}
