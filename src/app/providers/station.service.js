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
var http_1 = require("@angular/http");
require("rxjs/add/operator/map");
require("rxjs/add/operator/toPromise");
// Import RxJs required methods
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/catch");
var authentication_service_1 = require("../providers/authentication.service");
var StationService = (function () {
    function StationService(http, authService) {
        this.http = http;
        this.authService = authService;
        this.stationUrl = 'http://localhost:8080/api/stations';
        this.testUrl = 'http://localhost:8080/api/stationtest';
    }
    // Get all posts from the API
    /*  getStations() {
        return this.http.get('http://localhost:8080/api/stations')
          .map(res => res.json());
      }*/
    /*  getStations(): Promise<Station[]> {
        return this.http.get(this.stationUrl)
          .toPromise()
          .then(response => response.json() as Station[])
          .catch(this.handleError);
      }
      */
    // another problem :(
    // get station by its name
    // return as a single element of arry ??
    StationService.prototype.getStation = function (station_name) {
        return this.http.get("http://localhost:8080/api/station/" + station_name).map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    StationService.prototype.getStations = function () {
        return this.http.get(this.stationUrl).map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    // testing purporse
    StationService.prototype.getTest = function (searchStr) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(this.testUrl, { var: searchStr }, options) // why JSON.stringify() not used here ?
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    StationService.prototype.addStation = function (station) {
        var url = "http://localhost:8080/api/station";
        var headers = new http_1.Headers();
        headers.append('Authorization', this.authService.token);
        headers.append('Content-Type', 'application/json');
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.post(url, { station_name: station.station_name,
            coordinates: station.coordinates }, options // no need JSON.stringify()?
        )
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    StationService.prototype.deleteStation = function (id) {
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        return this.http.delete("http://localhost:8080/api/station/" + id, options)
            .map(function (res) { return res.json(); })
            .catch(this.handleError);
    };
    StationService.prototype.extractData = function (res) {
        var body = res.json();
        return body || {};
    };
    StationService.prototype.handleError = function (error) {
        // In a real world app, you might use a remote logging infrastructure
        var errMsg;
        if (error instanceof http_1.Response) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return Rx_1.Observable.throw(errMsg);
    };
    return StationService;
}());
StationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http, authentication_service_1.AuthenticationService])
], StationService);
exports.StationService = StationService;
//# sourceMappingURL=station.service.js.map