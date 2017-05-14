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
//import {Ng2DragDropModule} from "ng2-drag-drop";
var Subject_1 = require("rxjs/Subject");
var station_service_1 = require("../../providers/station.service");
var route_service_1 = require("../../providers/route.service");
var authentication_service_1 = require("../../providers/authentication.service");
var Widget = (function () {
    function Widget(name) {
        this.name = name;
    }
    return Widget;
}());
exports.Widget = Widget;
var AddRouteComponent = (function () {
    function AddRouteComponent(stationService, elementRef, routeService, authService) {
        this.stationService = stationService;
        this.elementRef = elementRef;
        this.routeService = routeService;
        this.authService = authService;
        this.listOne = [];
        this.receivedData = [];
        this.droppedItems = [];
        this._success = new Subject_1.Subject();
        this.newRoute = {
            name: null,
            start: null,
            end: null,
            path: null,
            kml_path: null,
            reviews: null,
        }; // its not define initially :D
    }
    AddRouteComponent.prototype.onItemDrop = function (e) {
        this.droppedItems.push(e.dragData);
        console.log(this.droppedItems);
    };
    AddRouteComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.debounceTime(1500).subscribe(function () {
            _this.successMessage = null;
        });
        //this.loadStations();
        // this.dataService=this.completerService.local(this.stations,'station_name','station_name');
    };
    AddRouteComponent.prototype.onKey = function (event) {
        var _this = this;
        //console.log(this.listOne);
        if (!(this.searchStr.trim() == "")) {
            this.stationService.getTest(this.searchStr).subscribe(function (stations) { return _this.stations = stations; });
        }
        else {
            this.stations = [];
        }
    };
    AddRouteComponent.prototype.onKeyRoute = function (event) {
        var _this = this;
        if (!(this.searchRouteStr.trim() == "")) {
            this.routeService.getTest(this.searchRouteStr).subscribe(function (routes) { return _this.routes = routes; });
        }
        else {
            this.routes = [];
        }
    };
    /*  filter() {
        if (this.searchStr !== ""){
          this.filteredList = this.stations.filter((el:any)=>{
            return el.toLowerCase().indexOf(this.searchStr.toLowerCase()) > -1;
          }.bind(this));
        }else{
          this.filteredList = [];
        }
      }*/
    AddRouteComponent.prototype.select = function (item) {
        this.searchStr = item;
        this.filteredList = [];
    };
    AddRouteComponent.prototype.loadStations = function () {
        var _this = this;
        this.stationService.getStations().subscribe(function (stations) { return _this.stations = stations; });
        // /*this.stationService.getStations().subscribe(
        //   stations => this.stations = stations
        // );*/
        /* this.stations=[
           { station_name: 'red', coordinates:[1,2] },
           { station_name: 'green', coordinates:[1,2] },
           { station_name: 'blue', coordinates:[1,2] }
     
         ];*/
    };
    AddRouteComponent.prototype.transferDataSuccess = function ($event) {
        //console.log($event.dragData);
        this.receivedData.push($event.dragData);
        this.listOne.push($event.dragData);
    };
    AddRouteComponent.prototype.onSelect = function (route) {
        this.listOne = [];
        var stationObjects = [];
        this.selectedRoute = route;
        var path = route.path;
        for (var _i = 0, path_1 = path; _i < path_1.length; _i++) {
            var station = path_1[_i];
            //console.log(station);
            this.stationService.getStation(station).subscribe(function (station) { return stationObjects.push(station[0]); });
        }
        this.listOne = stationObjects;
        this.newRoute.path = stationObjects;
        this.newRoute.kml_path = route.kml_path;
        this.newRoute.name = route.name;
        this.newRoute.start = route.start;
        this.newRoute.end = route.end;
        this.newRoute.reviews = route.reviews;
        //console.log(this.listOne);
    };
    AddRouteComponent.prototype.reset = function () {
        this.selectedRoute = null;
        this.listOne = [];
        // should have a another mrthod of doing this
        this.newRoute.kml_path = null;
        this.newRoute.name = null;
        this.newRoute.path = null;
        this.newRoute.reviews = [];
    };
    AddRouteComponent.prototype.updateRoute = function () {
        var _this = this;
        console.log(this.newRoute);
        var tempPath = this.newRoute.path;
        var newPath = [];
        for (var _i = 0, tempPath_1 = tempPath; _i < tempPath_1.length; _i++) {
            var station = tempPath_1[_i];
            newPath.push(station.station_name);
        }
        this.newRoute.path = newPath;
        this.authService.checkAuthentication().then(function (res) {
            _this.routeService.updateRoute(_this.selectedRoute._id, _this.newRoute).subscribe(function () {
                _this._success.next('Successfully update the route' + _this.selectedRoute.name);
            });
        }, function (err) {
            _this._success.next("operation restricted!");
        });
    };
    AddRouteComponent.prototype.delete = function () {
        var _this = this;
        this.authService.checkAuthentication().then(function (res) {
            _this.routeService.deleteRoute(_this.selectedRoute._id).subscribe(function () {
                _this._success.next('Successfully delete a route');
            });
        }, function (err) {
            _this._success.next("operation restricted!");
        });
    };
    AddRouteComponent.prototype.addNewRoute = function () {
        var _this = this;
        this.newRoute.path = [];
        if (this.listOne.length == 0) {
            console.log('set the route first');
        }
        for (var _i = 0, _a = this.listOne; _i < _a.length; _i++) {
            var station = _a[_i];
            this.newRoute.path.push(station.station_name);
        }
        //console.log(this.newRoute);
        this.authService.checkAuthentication().then(function (res) {
            _this.routeService.addRoute(_this.newRoute).subscribe(function (res) {
                _this._success.next(res.message);
            }, function (err) {
                _this._success.next("operation restricted!");
            });
        });
    };
    AddRouteComponent.prototype.clear = function () {
        this.searchStr = null;
    };
    AddRouteComponent.prototype.clearRoute = function () {
        this.searchRouteStr = null;
    };
    return AddRouteComponent;
}());
AddRouteComponent = __decorate([
    core_1.Component({
        selector: 'add-route',
        templateUrl: './add-route.component.html',
        styleUrls: ['./add-route.component.css']
    }),
    __metadata("design:paramtypes", [station_service_1.StationService, core_1.ElementRef,
        route_service_1.RouteService, authentication_service_1.AuthenticationService])
], AddRouteComponent);
exports.AddRouteComponent = AddRouteComponent;
//# sourceMappingURL=add-route.component.js.map