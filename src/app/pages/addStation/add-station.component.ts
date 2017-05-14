import { Component,OnInit,ViewChild,ElementRef,NgZone} from '@angular/core';
import {Station} from '../../dataModels/Station';
import {StationService} from '../../providers/station.service';
import {Subject} from 'rxjs/Subject';

declare var google:any;  // what the hack its did??

@Component({
  selector: 'add-station',
  templateUrl:'./add-station.component.html',
  styleUrls:['./add-station.component.css']
})
export class AddStationComponent implements OnInit {
  @ViewChild('map') mapElement: ElementRef;
  map: any;
  marker:any;
  station_name:string;
  private _success = new Subject<string>();

  successMessage: string;
  lat:number=0;
  lng:number=0;
  stations:Station[]=[];
  search_station_str:string;
  selectedStation:any;

  constructor(private zone: NgZone,private stationService:StationService){}

  ngOnInit() {
    this.initMap();
    this._success.subscribe((message) => this.successMessage = message);
    this._success.debounceTime(1500).subscribe(() =>{
      this.successMessage = null;
    });
  }
  //submitting new station
  onSubmit(){
    console.log("submitted clicked");
    let station:Station={
      station_name:this.station_name,
      coordinates:[this.lng,this.lat]
    };
    this.stationService.addStation(station).subscribe(()=> {
        this._success.next('Succesfully add a new station ' + this.station_name);
        this.station_name=''; // make station name empty
      }
    );
  }
  initMap() {
    let latLng = new google.maps.LatLng(6.937450, 79.861697);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    let marker = new google.maps.Marker({
      position:latLng,
      map:this.map,
      draggable: true
    });

    this.map.setCenter(marker.position);
    this.marker=marker;

    google.maps.event.addListener(marker,'dragend',(e:any)=>{
      this.map.setCenter(marker.position); // point maker at the center of the map
      this.zone.run(() => {
        this.lat=e.latLng.lat();
        this.lng=e.latLng.lng();
      });

    });

    google.maps.event.addListener(marker,'dragstart',function(e:any){
      console.log("dragging...........");
    });

    //nned more attention here
    google.maps.event.addListener(this.map,'click',(e:any)=>{
      this.map.setCenter(this.marker.position);
      this.zone.run(()=>{
         marker.position=e.latLng;
      });

      //console.log(marker.position);
    });

    /*this.map.event.addListener('click',function(e: any) {
      let marker = new google.maps.Marker({
        position: e.latLng,
        map: this.map
      });

    });
*/
  }

  getMarkerCentre(){
    this.map.setCenter(this.marker.position);
  }


  add_station:boolean=true;
  update_station:boolean=false;
  addStation(){
    this.add_station=true;
    this.update_station=false;
  }

  updateStation(){
    this.add_station=false;
    this.update_station=true;
  }

  onKey($event:any){
    if(!(this.search_station_str.trim()=="")) {
      this.stationService.getTest(this.search_station_str).subscribe(
        stations => this.stations = stations
      )
    }else{
      this.stations=[];
    }
  }

  onSelect(station:Station){
    this.selectedStation=station;
    this.search_station_str=station.station_name;
    this.lat=station.coordinates[0];
    this.lng=station.coordinates[1];
    this.stations=[];
  }

  deleteStation(){
    this.stationService.deleteStation(this.selectedStation._id).subscribe(()=> {
      this._success.next('Successfully delete a station');
    });
    this.search_station_str=null
    this.lat=0;
    this.lng=0;
  }

  upStation(){
    //update station name will be affct the whole system database
  }


}
