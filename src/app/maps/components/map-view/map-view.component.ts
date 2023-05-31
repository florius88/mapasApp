import { AfterViewInit, Component, ElementRef, ViewChild, inject } from '@angular/core';

import { Map } from 'mapbox-gl';

import { PlacesService } from '../../services';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  private placesService = inject(PlacesService)

  @ViewChild('mapDiv')
  mapDivElement!: ElementRef

  ngAfterViewInit(): void {
    if (!this.placesService.userLocation) throw Error('No hay placesService.userLocation')

    const map = new Map({
      container: this.mapDivElement.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.placesService.userLocation, // starting position [lng, lat]
      zoom: 14, // starting zoom
    });
  }

}
