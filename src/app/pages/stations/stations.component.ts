import { Component,OnInit } from '@angular/core';
import {StationService} from '../../providers/station.service';
import{Station} from '../../dataModels/Station';

@Component({
  selector: 'stations',
  templateUrl:'./stations.component.html'
})
export class StationsComponent implements OnInit {
  stations: Station[]; // make it a array first/.. it should be a search bar

  constructor(private stationService: StationService) {

  }

  ngOnInit() {
    this.stationService.getStations().subscribe(
      stations => this.stations = stations
    )


  }
}
