"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var router_1 = require("@angular/router");
var ng2_dnd_1 = require("ng2-dnd");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var station_service_1 = require("./providers/station.service");
var authentication_service_1 = require("./providers/authentication.service");
var route_service_1 = require("./providers/route.service");
var dashboard_component_1 = require("./pages/dashboard/dashboard.component");
var stations_component_1 = require("./pages/stations/stations.component");
var add_station_component_1 = require("./pages/addStation/add-station.component");
var add_route_component_1 = require("./pages/addRoute/add-route.component");
var login_component_1 = require("./pages/login/login.component");
var routes = [
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    { path: 'dashboard', component: dashboard_component_1.DashboardComponent },
    { path: 'stations', component: stations_component_1.StationsComponent },
    { path: 'addStation', component: add_station_component_1.AddStationComponent },
    { path: 'addRoute', component: add_route_component_1.AddRouteComponent },
    { path: 'login', component: login_component_1.LoginComponent }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, http_1.HttpModule, forms_1.FormsModule,
            router_1.RouterModule.forRoot(routes), ng2_dnd_1.DndModule.forRoot(), ng_bootstrap_1.NgbModule.forRoot()],
        declarations: [app_component_1.AppComponent, dashboard_component_1.DashboardComponent, stations_component_1.StationsComponent, add_station_component_1.AddStationComponent, add_route_component_1.AddRouteComponent, login_component_1.LoginComponent],
        bootstrap: [app_component_1.AppComponent],
        providers: [station_service_1.StationService, authentication_service_1.AuthenticationService, route_service_1.RouteService],
        exports: [router_1.RouterModule]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map