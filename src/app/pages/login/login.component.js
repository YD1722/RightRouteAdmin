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
var authentication_service_1 = require("../../providers/authentication.service");
var router_1 = require("@angular/router");
var LoginComponent = (function () {
    function LoginComponent(authService, router) {
        this.authService = authService;
        this.router = router;
        this.model = {}; //model save user crentials :D
        this.loading = false;
        this.error = '';
    }
    LoginComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loading = true;
        this.authService.checkAuthentication().then(function (res) {
            console.log("Already authorized");
            _this.loading = false;
            _this.router.navigate(['/dashboard']); // is route correcct??
        }, function (err) {
            console.log("Not already authorized");
            _this.loading = false;
        });
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        var credentials = {
            username: this.model.username,
            password: this.model.password
        };
        console.log(credentials);
        this.authService.login(credentials).then(function (result) {
            _this.loading = false;
            console.log(result);
            _this.router.navigate(['/dashboard']);
        }, function (err) {
            _this.loading = false;
            console.log(err);
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    core_1.Component({
        selector: 'login',
        templateUrl: './login.component.html'
    }),
    __metadata("design:paramtypes", [authentication_service_1.AuthenticationService, router_1.Router])
], LoginComponent);
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=login.component.js.map