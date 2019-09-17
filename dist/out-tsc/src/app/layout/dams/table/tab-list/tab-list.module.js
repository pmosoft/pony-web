"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var common_1 = require("@angular/common");
var tab_list_component_1 = require("./tab-list.component");
var tab_list_routing_module_1 = require("./tab-list-routing.module");
var TabListModule = /** @class */ (function () {
    function TabListModule() {
    }
    TabListModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule, tab_list_routing_module_1.TabListRoutingModule, forms_1.FormsModule
            ],
            declarations: [tab_list_component_1.TabListComponent]
        })
    ], TabListModule);
    return TabListModule;
}());
exports.TabListModule = TabListModule;
//# sourceMappingURL=tab-list.module.js.map