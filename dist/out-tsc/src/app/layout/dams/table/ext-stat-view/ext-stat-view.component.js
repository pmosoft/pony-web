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
var router_1 = require("@angular/router");
var router_2 = require("@angular/router");
var ExtStatViewComponent = /** @class */ (function () {
    function ExtStatViewComponent(router, route) {
        this.router = router;
        this.route = route;
        this.result = "";
    }
    ExtStatViewComponent.prototype.ngOnInit = function () {
        console.log("aa=" + this.route.snapshot.paramMap.get('result'));
        this.result = this.route.snapshot.paramMap.get('result');
    };
    ExtStatViewComponent.prototype.onExtStatViewToRows = function () {
    };
    ExtStatViewComponent = __decorate([
        core_1.Component({
            selector: 'app-ext-stat-view',
            templateUrl: './ext-stat-view.component.html',
            styleUrls: ['./ext-stat-view.component.scss']
        }),
        __metadata("design:paramtypes", [router_1.Router,
            router_2.ActivatedRoute])
    ], ExtStatViewComponent);
    return ExtStatViewComponent;
}());
exports.ExtStatViewComponent = ExtStatViewComponent;
//# sourceMappingURL=ext-stat-view.component.js.map