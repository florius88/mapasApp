import { Component, inject } from '@angular/core';

import { MapService, PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';


@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent {

  private placesService = inject(PlacesService)
  private mapService = inject(MapService)

  public selectedId: string = ''

  get isLoadingPlaces(): boolean {
    return this.placesService.isLoadingPlaces
  }

  get places(): Feature[] {
    return this.placesService.places
  }

  flyTo(place: Feature) {
    this.selectedId = place.id

    const [lng, lat] = place.center
    this.mapService.flyTo([lng, lat])
  }

}
