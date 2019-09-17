"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var router_1 = require("@angular/router");
var tab_info_ext_component_1 = require("./tab-info-ext.component");
var routes = [
    {
        path: '',
        component: tab_info_ext_component_1.TabInfoExtComponent,
    }
];
var TabInfoExtRoutingModule = /** @class */ (function () {
    function TabInfoExtRoutingModule() {
    }
    TabInfoExtRoutingModule = __decorate([
        core_1.NgModule({
            imports: [router_1.RouterModule.forChild(routes)],
            exports: [router_1.RouterModule]
        })
    ], TabInfoExtRoutingModule);
    return TabInfoExtRoutingModule;
}());
exports.TabInfoExtRoutingModule = TabInfoExtRoutingModule;
//# sourceMappingURL=tab-info-ext-routing.module.js.map