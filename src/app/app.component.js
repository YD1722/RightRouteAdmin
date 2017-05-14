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
var authentication_service_1 = require("./providers/authentication.service");
var router_1 = require("@angular/router");
var Subject_1 = require("rxjs/Subject");
var AppComponent = (function () {
    function AppComponent(authSevrice, router) {
        this.authSevrice = authSevrice;
        this.router = router;
        this.name = 'RR ADMIN ';
        this._success = new Subject_1.Subject();
        this.staticAlertClosed = false;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this._success.subscribe(function (message) { return _this.successMessage = message; });
        this._success.debounceTime(1500).subscribe(function () {
            _this.successMessage = null;
        });
    };
    // need more attention regarding routing
    AppComponent.prototype.logout = function () {
        var _this = this;
        this.authSevrice.checkAuthentication().then(function (res) {
            _this.authSevrice.logout();
            _this.router.navigate(['/dashboard']);
            _this._success.next("Successfully logged out");
        }, function (err) {
            _this._success.next("already logged out");
        });
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        templateUrl: './app.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map