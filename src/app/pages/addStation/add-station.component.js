"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var station_service_1 = require("../../providers/station.service");
var Subject_1 = require("rxjs/Subject");
var AddStationComponent = (function () {
    function AddStationComponent(zone, stationService) {
        this.zone = zone;
        this.stationService = stationService;
        this._success = new Subject_1.Subject();
        this.lat = 0;
        this.lng = 0;
        this.stations = [];
        this.add_station = true;
        this.update_station = false;
    }
    AddStationComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.initMap();
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.debounceTime(1500).subscribe(function () {
            _this.successMessage = null;
        });
    };
    //submitting new station
    AddStationComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log("submitted clicked");
        var station = {
            station_name: this.station_name,
            coordinates: [this.lng, this.lat]
        };
        this.stationService.addStation(station).subscribe(function () {
            _this._success.next('Succesfully add a new station ' + _this.station_name);
            _this.station_name = ''; // make station name empty
        });
    };
    AddStationComponent.prototype.initMap = function () {
        var _this = this;
        var latLng = new google.maps.LatLng(6.937450, 79.861697);
        var mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
        var marker = new google.maps.Marker({
            position: latLng,
            map: this.map,
            draggable: true
        });
        this.map.setCenter(marker.position);
        this.marker = marker;
        google.maps.event.addListener(marker, 'dragend', function (e) {
            _this.map.setCenter(marker.position); // point maker at the center of the map
            _this.zone.run(function () {
                _this.lat = e.latLng.lat();
                _this.lng = e.latLng.lng();
            });
        });
        google.maps.event.addListener(marker, 'dragstart', function (e) {
            console.log("dragging...........");
        });
        //nned more attention here
        google.maps.event.addListener(this.map, 'click', function (e) {
            _this.map.setCenter(_this.marker.position);
            _this.zone.run(function () {
                marker.position = e.latLng;
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
    };
    AddStationComponent.prototype.getMarkerCentre = function () {
        this.map.setCenter(this.marker.position);
    };
    AddStationComponent.prototype.addStation = function () {
        this.add_station = true;
        this.update_station = false;
    };
    AddStationComponent.prototype.updateStation = function () {
        this.add_station = false;
        this.update_station = true;
    };
    AddStationComponent.prototype.onKey = function ($event) {
        var _this = this;
        if (!(this.search_station_str.trim() == "")) {
            this.stationService.getTest(this.search_station_str).subscribe(function (stations) { return _this.stations = stations; });
        }
        else {
            this.stations = [];
        }
    };
    AddStationComponent.prototype.onSelect = function (station) {
        this.selectedStation = station;
        this.search_station_str = station.station_name;
        this.lat = station.coordinates[0];
        this.lng = station.coordinates[1];
        this.stations = [];
    };
    AddStationComponent.prototype.deleteStation = function () {
        var _this = this;
        this.stationService.deleteStation(this.selectedStation._id).subscribe(function () {
            _this._success.next('Successfully delete a station');
        });
        this.search_station_str = null;
        this.lat = 0;
        this.lng = 0;
    };
    AddStationComponent.prototype.upStation = function () {
        //update station name will be affct the whole system database
    };
    return AddStationComponent;
}());
__decorate([
    core_1.ViewChild('map'),
    __metadata("design:type", core_1.ElementRef)
], AddStationComponent.prototype, "mapElement", void 0);
AddStationComponent = __decorate([
    core_1.Component({
        selector: 'add-station',
        templateUrl: './add-station.component.html',
        styleUrls: ['./add-station.component.css']
    }),
    __metadata("design:paramtypes", [core_1.NgZone, station_service_1.StationService])
], AddStationComponent);
exports.AddStationComponent = AddStationComponent;
//# sourceMappingURL=add-station.component.js.map