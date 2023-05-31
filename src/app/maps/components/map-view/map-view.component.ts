import { Component, OnInit, inject } from '@angular/core';

import { PlacesService } from '../../services';


@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements OnInit {

  private placesService = inject(PlacesService)

  ngOnInit(): void {
    console.log(this.placesService.userLocation);
  }

}
